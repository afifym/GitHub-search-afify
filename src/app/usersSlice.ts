import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../api/queries"
import { User } from "../types"
import { toast } from "react-toastify"

export const searchUsers = createAsyncThunk(
  "users/search",
  async ({ query, page }: { query: string; page: number }) => {
    const results = await getUsers(query, page)
    return results.data
  },
)

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    cache: {} as Record<string, Record<number, User[]>>,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "success"
        const { query, page } = action.meta.arg
        const { items } = action.payload

        if (!state.cache[query]) {
          state.cache[query] = {}
        }

        state.cache[query][page] = items
      })
      .addCase(searchUsers.rejected, (state) => {
        state.status = "error"
        toast.error("An error occurred")
      })
  },
})

export default usersSlice.reducer
