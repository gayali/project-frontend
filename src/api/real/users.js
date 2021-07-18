import { get, post } from '../helpers/axiosHelper'

const url = `${process.env.VUE_APP_API_URL}`

const login = async (data) => post(`${url}/login`, data)
const userDetails = async (data) => post(`${url}/me`, null)
const fetchAll = async () => get(`${url}/users/all`)
const newUser = async (payload) => post(`${url}/users`,payload)
const edit = async (id,payload) => post(`${url}/users/${id}/edit`,payload)
export default {
  login,
  userDetails,
  fetchAll,
  newUser,
  edit
}
