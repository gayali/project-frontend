import { get } from '../helpers/axiosHelper'

const getProjects = async () => get(`${process.env.VUE_APP_API_URL}/projects`)

export default {
    getProjects
}