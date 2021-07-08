import { get } from '../helpers/axiosHelper'

const getRoles = async () => get(`${process.env.VUE_APP_API_URL}/roles`)

export default {
  getRoles
}
