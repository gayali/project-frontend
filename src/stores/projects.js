import { RepositoryFactory } from '@/api/repositoryFactory'
import router from '../js/router'
const repository = RepositoryFactory.get('projects')

export default {
  state: {
    projects: {},
    loading: false,
    projectsError: '',
    newProjectError: '',
  },
  getters: {
    projectsError: (state) => state.projectsError,
    loading: (state) => state.loading,
    projects: (state) => state.projects,
    newProjectError: (state) => state.newProjectError,
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
    },
    SET_NEW_PROJECT_ERROR(state, error) {
      state.newProjectError = error
    },
  },
  actions: {
    async fetch({ commit, state, dispatch }) {
        try {
            commit('SET_LOADING', true)
            const response = await repository.getProjects()
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

    async submit({ commit, state, dispatch },payload) {
      try {
          commit('SET_LOADING', true)
          const response = await repository.newProject(payload)
          if (response.status === 200 || response.status === 201) {
              dispatch('fetch')
              alert(response.data.message)
              router.go(-1)
          }else{
              commit('SET_NEW_PROJECT_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          console.log(e)
          console.log(e.response)
          commit('SET_NEW_PROJECT_ERROR', e.response.data.message)
          commit('SET_LOADING', false)
        }
  },
  async resetError({
    commit
  }) {
    commit('SET_NEW_PROJECT_ERROR', '')
  },
  },
  namespaced: true
}