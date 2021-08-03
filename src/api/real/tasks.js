import { get,post  } from '../helpers/axiosHelper'

const getTasks = async () => get(`${process.env.VUE_APP_API_URL}/tasks`)
const newTask = async (payload) => post(`${process.env.VUE_APP_API_URL}/tasks`,payload)
const editTask = async (id,payload) => post(`${process.env.VUE_APP_API_URL}/tasks/${id}/edit`,payload)
const deleteTask = async (payload) => post(`${process.env.VUE_APP_API_URL}/tasks/${payload.id}/destroy`,payload)

export default {
    getTasks,
    newTask,
    editTask,
    deleteTask
}