import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import App from "./App"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PersistGate } from "redux-persist/integration/react"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
