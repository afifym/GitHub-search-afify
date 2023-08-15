import axios from "axios"

const restClient = axios.create({
  baseURL: "https://api.github.com/search",
  timeout: 1000,
})

export default restClient
