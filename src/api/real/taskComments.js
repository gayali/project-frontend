import { get,post  } from '../helpers/axiosHelper'

const getTaskComments = async (payload) => post(`${process.env.VUE_APP_API_URL}/taskComments/all`,payload)
const newTaskComment= async (payload) => post(`${process.env.VUE_APP_API_URL}/taskComments`,payload)

export default {
    getTaskComments,
    newTaskComment
}