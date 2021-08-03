import {
    RepositoryFactory
  } from '@/api/repositoryFactory'
  import router from '../js/router'
  const repository = RepositoryFactory.get('tasks')
  
  export default {
    state: {
      tasks: {},
      loading: false,
      tasksError: '',
      newTaskError: '',
      editTaskError:''
    },
    getters: {
      tasksError: (state) => state.tasksError,
      loading: (state) => state.loading,
      tasks: (state) => state.tasks,
      newTaskError: (state) => state.newTaskError,
      editTaskError: (state) => state.editTaskError,
    },
    mutations: {
      SET_TASKS_ERROR(state, error) {
        state.projectsError = error
      },
      SET_LOADING(state, boolean) {
        state.loading = boolean
      },
      SET_TASKS(state, payload) {
        state.tasks = payload
      },
      SET_NEW_TASK_ERROR(state, error) {
        state.newTaskError = error
      },
      SET_EDIT_TASK_ERROR(state, error) {
        state.editTaskError = error
      },
    },
    actions: {
      async fetch({
        commit,
        state,
        dispatch
      }) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.getTasks()
          if (response.status === 200 || response.status === 201) {
  
            commit('SET_TASKS', response.data.tasks)
          } else {
            commit('SET_TASKS_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          console.log(e)
          console.log(e.response)
          commit('SET_TASKS_ERROR', e.response.data.message)
          commit('SET_LOADING', false)
        }
      },
  
      setTasks({
        commit
      }, payload) {
        commit('SET_TASKS', payload)
      },
      setTasksError({
        commit
      }, payload) {
        commit('SET_TASKS_ERROR', payload)
      },
      setLoading({
        commit
      }, boolean) {
        commit('SET_LOADING', boolean)
      },
  
      async submit({
        commit,
        state,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.newTask(payload)
          if (response.status === 200 || response.status === 201) {
            dispatch('fetch')
            alert(response.data.message)
            router.push({name:'Dashboard'})
          } else {
            commit('SET_NEW_TASK_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          console.log(e)
          console.log(e.response)
          commit('SET_NEW_TASK_ERROR', e.response.data.message)
          commit('SET_LOADING', false)
        }
      },
      async resetError({
        commit
      }) {
        commit('SET_NEW_TASK_ERROR', '')
        commit('SET_EDIT_TASK_ERROR', '')
      },
      
      async edit({
        commit,
        state,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.editTask(payload.id,payload)
          if (response.status === 200 || response.status === 201) {
            dispatch('fetch')
            alert(response.data.message)
            router.push({name:'Dashboard'})
          } else {
            commit('SET_EDIT_TASK_ERROR', response.data.message)
          }
          commit('SET_LOADING', false)
        } catch (e) {
          commit('SET_LOADING', false)
          console.log(e)
          console.log(e.response)
          commit('SET_EDIT_TASK_ERROR', e.response.data.message)
     
        }
      },

      async delete({
        commit,
        state,
        dispatch
      }, payload) {
        try {
          commit('SET_LOADING', true)
          const response = await repository.deleteTask(payload)
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
          alert(response.data.message)
      
        }
      },
    },
    namespaced: true
  }