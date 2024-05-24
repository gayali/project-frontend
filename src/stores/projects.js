import {
  RepositoryFactory
} from '@/api/repositoryFactory'
import router from '../js/router'
const repository = RepositoryFactory.get('projects')

export default {
  state: {
    projects: {},
    loading: false,
    projectsError: '',
    newProjectError: '',
    editProjectError: '',
    selectedProject:{}
  },
  getters: {
    projectsError: (state) => state.projectsError,
    loading: (state) => state.loading,
    projects: (state) => state.projects,
    newProjectError: (state) => state.newProjectError,
    editProjectError: (state) => state.editProjectError,
    selectedProject: (state) => state.selectedProject,
  },
  mutations: {
    SET_PROJECTS_ERROR(state, error) {
      state.projectsError = error
    },
    SET_LOADING(state, boolean) {
      state.loading = boolean
    },
    SET_PROJECTS(state, payload) {
      state.projects = payload
    },
    SET_NEW_PROJECT_ERROR(state, error) {
      state.newProjectError = error
    },
    SET_EDIT_PROJECT_ERROR(state, error) {
      state.editProjectError = error
    },
    SET_SELECTED_PROJECT(state, payload) {
      state.selectedProject = payload
    },
  },
  actions: {
    async fetch({
      commit
    }) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.getProjects()
        if (response.status === 200 || response.status === 201) {

          commit('SET_PROJECTS', response.data.projects)
        } else {
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

    setProjects({
      commit
    }, payload) {
      commit('SET_PROJECTS', payload)
    },
    setProjectsError({
      commit
    }, payload) {
      commit('SET_PROJECTS_ERROR', payload)
    },
    setLoading({
      commit
    }, boolean) {
      commit('SET_LOADING', boolean)
    },

    async submit({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.newProject(payload)
        if (response.status === 200 || response.status === 201) {
         
          alert(response.data.message)
          dispatch('fetch')
        
          router.push({name:'Dashboard'})
        } else {
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
    async edit({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.editProject(payload)
        if (response.status === 200 || response.status === 201) {
          dispatch('fetch')
        
          router.push({name:'Dashboard'})
          alert(response.data.message)
        } else {
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

    async delete({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.deleteProject(payload)
        alert(response.data.message)
        if (response.status === 200 || response.status === 201)  {
          dispatch('fetch')
         
          router.push({name:'Dashboard'})
        }
        commit('SET_LOADING', false)
      } catch (e) {
        commit('SET_LOADING', false)
        console.log(e)
        console.log(e.response)
        alert(e.response.data.message)
  
      }
    },
    async resetError({
      commit
    }) {
      commit('SET_NEW_PROJECT_ERROR', '')
      commit('SET_EDIT_PROJECT_ERROR', '')
    },
    updateSelectedProject({state,commit},payload){
     let project= state.projects.find(project =>{
       return payload.id==project.id
      })
      if(project){
          commit('SET_SELECTED_PROJECT',project)
      }
    
    }
  },
  namespaced: true
}