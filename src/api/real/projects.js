import { get,post  } from '../helpers/axiosHelper'

const getProjects = async () => get(`${process.env.VUE_APP_API_URL}/projects`)
const newProject = async (payload) => post(`${process.env.VUE_APP_API_URL}/projects`,payload)
const editProject = async (payload) => post(`${process.env.VUE_APP_API_URL}/projects/${payload.id}/edit`,payload)
const deleteProject = async (payload) => post(`${process.env.VUE_APP_API_URL}/projects/${payload.id}/destroy`,payload)
export default {
    getProjects,
    newProject,
    editProject,
    deleteProject
}