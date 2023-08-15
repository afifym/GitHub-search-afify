import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getRepos } from "../api/queries"
import { Repo } from "../types"
import { toast } from "react-toastify"

export const searchRepos = createAsyncThunk(
  "repos/search",
  async ({ query, page }: { query: string; page: number }) => {
    const results = await getRepos(query, page)
    return results.data
  },
)

export const reposSlice = createSlice({
  name: "repos",
  initialState: {
    cache: {} as Record<string, Record<number, Repo[]>>,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRepos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchRepos.fulfilled, (state, action) => {
        state.status = "success"
        const { query, page } = action.meta.arg
        const { items } = action.payload

        if (!state.cache[query]) {
          state.cache[query] = {}
        }

        state.cache[query][page] = items
      })
      .addCase(searchRepos.rejected, (state) => {
        state.status = "error"
        toast.error("An error occurred")
      })
  },
})

export default reposSlice.reducer
