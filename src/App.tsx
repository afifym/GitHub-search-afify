import * as React from "react"
import { useDebounce } from "use-debounce"
import SelectInput from "./components/SelectInput"
import TextInput from "./components/TextInput"

import github from "./github.svg"
import UserCard from "./components/UserCard"
import { Repo, User } from "./types"
import Loader from "./components/Loader"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { searchUsers } from "./app/usersSlice"
import RepoCard from "./components/RepoCard"
import { searchRepos } from "./app/reposSlice"
import BottomScrollObserver from "./components/BottomScrollObserver"

type Type = "users" | "repos"

function App() {
  const [query, setQuery] = React.useState("")
  const [type, setType] = React.useState<Type>("users")
  const [page, setPage] = React.useState(0)
  const [debouncedQuery] = useDebounce(query, 500)

  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector((state) => ({
    data: state[type].cache[debouncedQuery],
    status: state[type].status,
  }))

  const currentPageData = data?.[page]
  const isCurrentPageFetched = !!currentPageData
  const isLastPage = currentPageData?.length < 30

  React.useEffect(() => {
    if (!isCurrentPageFetched && debouncedQuery && debouncedQuery.length > 2) {
      if (type === "users") {
        dispatch(searchUsers({ query: debouncedQuery, page }) as any)
      } else {
        dispatch(searchRepos({ query: debouncedQuery, page }) as any)
      }
    }
  }, [debouncedQuery, type, isCurrentPageFetched, page])

  const handleChangeQuery = (val: string) => {
    setPage(0)
    setQuery(val)
  }

  const handleChangeType = (val: string) => {
    setPage(0)
    setType(val as Type)
  }

  const handleScrollToBottom = () => {
    if (status === "loading") return
    setPage((p) => p + 1)
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-10">
      <div>
        <div className="flex items-center gap-x-4 mb-4">
          <img className="w-14" src={github} alt="github" />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800">
              GitHub Searcher
            </h2>
            <p className="text-gray-400">Search users or repositories below</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4 w-fit mb-10">
          <TextInput
            placeholder="Start typing to search .."
            onChange={handleChangeQuery}
            value={query}
          />
          <SelectInput
            onChange={handleChangeType}
            value={type}
            options={[
              {
                label: "Users",
                value: "users",
              },
              {
                label: "Repositories",
                value: "repos",
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {new Array(page + 1)
            .fill(null)
            .map((_, page) =>
              data?.[page]?.map((item) =>
                type === "users" ? (
                  <UserCard key={item.id} user={item as User} />
                ) : (
                  <RepoCard key={item.id} repo={item as Repo} />
                ),
              ),
            )}
        </div>

        {status === "loading" && <Loader />}

        {!isLastPage && data?.[0] && (
          <BottomScrollObserver onScrolledToBottom={handleScrollToBottom} />
        )}
      </div>
    </div>
  )
}

export default App
