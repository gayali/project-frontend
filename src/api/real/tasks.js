import { get,post  } from '../helpers/axiosHelper'

const oneTask = async (taskBranchName) => get(`${process.env.VUE_APP_API_URL}/tasks/${taskBranchName}/one`)
const getTasks = async () => get(`${process.env.VUE_APP_API_URL}/tasks`)
const newTask = async (payload) => post(`${process.env.VUE_APP_API_URL}/tasks`,payload)
const editTask = async (id,payload) => post(`${process.env.VUE_APP_API_URL}/tasks/${id}/edit`,payload)
const deleteTask = async (payload) => post(`${process.env.VUE_APP_API_URL}/tasks/${payload.id}/destroy`,payload)

export default {
    oneTask,
    getTasks,
    newTask,
    editTask,
    deleteTask
}