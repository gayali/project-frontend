import {
    RepositoryFactory
  } from '@/api/repositoryFactory'
  import router from '../js/router'
  const repository = RepositoryFactory.get('sprints')
  
  export default {
    state: {
      sprints: [],
      loading: false,
      sprintsError: '',
      newSprintError: '',
      editSprintError: ''
    },
    getters: {
      sprintsError: (state) => state.sprintsError,
      loading: (state) => state.loading,
      sprints: (state) => state.sprints,
      newSprintError: (state) => state.newSprintError,
      editSprintError: (state) => state.editSprintError,
    },
    mutations: {
      SET_SPRINTS_ERROR(state, error) {
        state.sprintsError = error
      },
      SET_LOADING(state, boolean) {
        state.loading = boolean
      },
      SET_SPRINTS(state, payload) {
        state.sprints = payload
      },
      SET_NEW_SPRINT_ERROR(state, error) {
        state.newSprintError = error
      },
      SET_EDIT_SPRINT_ERROR(state, error) {
        state.editSprintError = error
      }
    },
    actions: {
      async fetch({
        commit
      }) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.getSprints()
          if (response.status === 200 || response.status === 201) {
  
            commit('SET_SPRINTS', response.data.sprints)
          } else {
            commit('SET_SPRINTS_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          console.log(e)
          console.log(e.response)
          commit('SET_SPRINTS_ERROR', e.response.data.message)
          commit('SET_LOADING', false)
        }
      },
  
      setSprints({
        commit
      }, payload) {
        commit('SET_SPRINTS', payload)
      },
      setSprintsError({
        commit
      }, payload) {
        commit('SET_SPRINTS_ERROR', payload)
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
          const response = await repository.newSprint(payload)
          if (response.status === 200 || response.status === 201) {           
            alert(response.data.message)
            dispatch('fetch')          
            router.push({name:'Dashboard'})
          } else {
            commit('SET_NEW_SPRINT_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          commit('SET_LOADING', false)
          console.log(e)
          console.log(e.response)
          commit('SET_NEW_SPRINT_ERROR', e.response.data.message)
        }
      },
      async activate({
        commit,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.activateSprint(payload)
          alert(response.data.message)
          if (response.status === 200 || response.status === 201)  {
            dispatch('fetch')
            alert(response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          commit('SET_LOADING', false)
          console.log(e)
          console.log(e.response)
          alert(e.response.data.message)
    
        }
      },
      async renameSprint({
        commit,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.renameSprint(payload.sprint.id,{name:payload.sprintName})
          if (response.status === 200 || response.status === 201) {
            dispatch('fetch')
            alert(response.data.message)
          } else {
            commit('SET_NEW_SPRINT_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          console.log(e)
          console.log(e.response)
          commit('SET_NEW_SPRINT_ERROR', e.response.data.message)
          commit('SET_LOADING', false)
        }
      },
  
      async deleteSprint({
        commit,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.deleteSprint(payload)
          alert(response.data.message)
          if (response.status === 200 || response.status === 201)  {
            dispatch('fetch')
            alert(e.response.data.message)
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
        commit('SET_NEW_SPRINT_ERROR', '')
        commit('SET_EDIT_SPRINT_ERROR', '')
      },
    },
    namespaced: true
  }