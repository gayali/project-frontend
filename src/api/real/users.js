import { get, post } from '../helpers/axiosHelper'

const url = `${process.env.VUE_APP_API_URL}`

const login = async (data) => post(`${url}/login`, data)
const userDetails = async (data) => post(`${url}/me`, null)
const fetchAll = async () => get(`${url}/users/all`)

export default {
  login,
  userDetails,
  fetchAll
}
