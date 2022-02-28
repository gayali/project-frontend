import { get,post  } from '../helpers/axiosHelper'

const getSprints = async () => get(`${process.env.VUE_APP_API_URL}/sprints`)
const newSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints`,payload)
const editSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints/${payload.id}/edit`,payload)
const deleteSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints/${payload.id}/destroy`,payload)
export default {
    getSprints,
    newSprint,
    editSprint,
    deleteSprint
}