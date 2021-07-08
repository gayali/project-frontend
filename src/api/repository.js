import axios from 'axios'

axios.defaults.baseURL = `/`
axios.defaults.responseType = 'json'
axios.defaults.withCredentials = true

export default axios
