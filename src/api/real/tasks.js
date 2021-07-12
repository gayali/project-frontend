import { get,post  } from '../helpers/axiosHelper'

const getTasks = async () => get(`${process.env.VUE_APP_API_URL}/tasks`)
const newTask = async (payload) => post(`${process.env.VUE_APP_API_URL}/tasks`,payload)

export default {
    getTasks,
    newTask
}