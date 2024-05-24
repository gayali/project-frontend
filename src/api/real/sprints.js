import { get, post } from '../helpers/axiosHelper'

const getSprints = async () => get(`${process.env.VUE_APP_API_URL}/sprints`)
const newSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints`, payload)
const activateSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints/${payload.id}/activate`, payload)
const renameSprint = async (id, payload) => post(`${process.env.VUE_APP_API_URL}/sprints/${id}/edit`, payload)
const deleteSprint = async (payload) => post(`${process.env.VUE_APP_API_URL}/sprints/${payload.id}/destroy`, payload)

export default {
    getSprints,
    newSprint,
    activateSprint,
    renameSprint,
    deleteSprint
}