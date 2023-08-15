import restClient from "./restClient"

export const getUsers = async (val: string, page?: number) => {
  const res = restClient(`/users?q=${val}${page ? `&page=${page}` : ""}`)
  return res
}

export const getRepos = async (val: string, page?: number) => {
  const res = restClient(`/repositories?q=${val}${page ? `&page=${page}` : ""}`)
  return res
}

export const getResults = async (
  selected: "users" | "repos",
  val: string,
  page?: number,
) => {
  let results

  if (selected === "users") {
    results = await getUsers(val, page)
  } else if (selected === "repos") {
    results = await getRepos(val, page)
  }

  return results
}
