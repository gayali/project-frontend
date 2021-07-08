import { get,post  } from '../helpers/axiosHelper'

const getProjects = async () => get(`${process.env.VUE_APP_API_URL}/projects`)
const newProject = async (payload) => post(`${process.env.VUE_APP_API_URL}/projects`,payload)

export default {
    getProjects,
    newProject
}