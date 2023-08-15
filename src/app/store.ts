import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import usersReducer from "./usersSlice"
import reposReducer from "./reposSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  users: usersReducer,
  repos: reposReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const persistor = persistStore(store)
