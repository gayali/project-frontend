import { RepositoryFactory } from '@/api/repositoryFactory'
import router from '../js/router'
const repository = RepositoryFactory.get('projects')

export default {
  state: {
    projects: {},
    loading: false,
    projectsError: '',
  },
  getters: {
    projectsError: (state) => state.projectsError,
    loading: (state) => state.loading,
    projects: (state) => state.projects,
  },
  mutations: {
    SET_PROJECTS_ERROR(state, error) {
      state.projectsError = error
    },
    SET_LOADING(state, boolean) {
      state.status = boolean
    },
    SET_PROJECTS(state,payload){
      state.projects = payload
    }
  },
  actions: {
    async fetch({ commit, state, dispatch }) {
        try {
            commit('SET_LOADING', true)
            const response = await repository.getProjects()
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                
                commit('SET_PROJECTS', response.data.projects)
            }else{
                commit('SET_PROJECTS_ERROR', response.data.message)
            }
            commit('SET_LOADING', false)
          } catch (e) {
            console.log(e)
            console.log(e.response)
            commit('SET_PROJECTS_ERROR', e.response.data.message)
            commit('SET_LOADING', false)
          }
    },
  
    setProjects({ commit }, payload){
        commit('SET_PROJECTS',payload)
    },
    setProjectsError({ commit }, payload){
        commit('SET_PROJECTS_ERROR',payload)
    },
    setLoading({ commit }, boolean){
        commit('SET_LOADING',boolean)
    },
  },
  namespaced: true
}