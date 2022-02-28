import {
  RepositoryFactory
} from '@/api/repositoryFactory'
import router from '../js/router'
import auth from '../js/helpers/auth'
import * as Roles from "../enums/roles"
const repository = RepositoryFactory.get('users')

export default {
  state: {
    user: {},
    isLoggedin: false,
    loading: false,
    loginError: '',
    status: '',
    accessToken: '',
    users: {},
    newUserError: '',
    editUserError: ''
  },
  getters: {
    isLoggedin: (state) => (state.accessToken) && state.accessToken !== '' && state.isLoggedin,
    loginError: (state) => state.loginError,
    loading: (state) => state.loading,
    status: (state) => state.status,
    token: (state) => state.accessToken,
    user: (state) => state.user,
    users: (state) => state.users,
    newUserError: (state) => state.newUserError,
    editUserError: (state) => state.editUserError
  },
  mutations: {
    SET_NEW_USER_ERROR(state, payload) {
      state.newUserError = payload
    },
    SET_EDIT_USER_ERROR(state, payload) {
      state.editUserError = payload
    },
    SET_USER(state, payload) {
      state.user = {
        ...payload
      }
    },
    SET_USERS(state, payload) {
      state.users = payload
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    IS_LOGGED_IN(state, boolean) {
      state.isLoggedin = boolean
    },
    SET_TOKEN(state, token) {
      state.accessToken = token
      auth.storeToken(token)
    },
    RESET_TOKEN(state) {
      state.accessToken = null
      auth.clearToken()
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error
    },
    SET_STATUS(state, status) {
      state.status = status
    },
  },
  actions: {
    async fetch({
      commit
    }) {

      if (
        localStorage.projectAccessToken !== undefined &&
        localStorage.projectAccessToken !== ''
      ) {
        commit('SET_TOKEN', localStorage.projectAccessToken)
      }
    },
    setAccessToken({
      commit
    }, token) {
      commit('SET_TOKEN', token)
    },
    setIsLoggedIn({
      commit
    }) {
      commit('IS_LOGGED_IN', true)
    },
    setLoginData({
      commit
    }, data) {
      if (data.access_token !== undefined && data.access_token.length > 0) {
        commit('SET_TOKEN', data.access_token)
      }
    },
    async resetError({
      commit
    }) {
      commit('SET_LOGIN_ERROR', '')
      commit('SET_NEW_USER_ERROR', '')
      commit('SET_EDIT_USER_ERROR', '')
    },
    async login({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.login(payload)
        if (response.status === 200 || response.status === 201) {
          dispatch('setIsLoggedIn', true)
          dispatch('setLoginData', {
            ...response.data,
            useRoute: true
          })
          dispatch('fetchUserDetails')
          dispatch('fetchAll')
          dispatch('tasks/fetch', {}, {
            root: true
          })
          router.push('../dashboard')
        }
        commit('SET_LOADING', false)
      } catch (e) {
        console.log(e)
        console.log(e.response)
        commit('SET_LOADING', false)
        commit('SET_STATUS', e)
        commit('SET_LOGIN_ERROR', 'Wrong email address or password')
      }
    },

    logout({
      commit,
      dispatch
    }) {
      commit('IS_LOGGED_IN', false)
      commit('RESET_TOKEN')
      router.push({
        path: '../login'
      })
      dispatch('components/setModalVisibility', false, {
        root: true
      })
      dispatch('setUser', {})
      dispatch('setUsers', {})
      dispatch('tasks/setTasks', {}, {
        root: true
      })

    },
    setUser({
      commit
    }, payload) {
      commit('SET_USER', payload)
    },
    setUsers({
      commit
    }, payload) {
      commit('SET_USERS', payload)
    },
    async fetchUserDetails({
      dispatch
    }) {
      try {
        const response = await repository.userDetails()
        if (response.status === 200 || response.status === 201) {
          dispatch('setUser', response.data)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response)
      }
    },
    async fetchAll({
      commit
    }) {
      try {
        const response = await repository.fetchAll()
        if (response.status === 200 || response.status === 201) {
          commit('SET_USERS', response.data.users)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response)
      }
    },
    set_new_user_error({
      commit
    }, payload) {
      commit('SET_NEW_USER_ERROR', payload)
    },
    set_edit_user_error({
      commit
    }, payload) {
      commit('SET_EDIT_USER_ERROR', payload)
    },
    async new({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)

        const response = await repository.newUser(payload)

        if (response.status === 200 || response.status === 201) {
          dispatch('fetchAll')
          alert(response.data.message)
          router.push({
            name: 'Dashboard'
          })
        } else {
          commit('SET_NEW_USER_ERROR', response.data.message)

        }
        commit('SET_LOADING', false)
      } catch (e) {
        commit('SET_LOADING', false)
        console.log(e)
        console.log(e.response)
        commit('SET_NEW_USER_ERROR', e.response.data.message)
      }
    },
    async edit({
      commit,
      dispatch
    }, payload) {
      try {
        commit('SET_LOADING', true)
        const response = await repository.edit(payload.id, payload)

        if (response.status === 200 || response.status === 201) {
          dispatch('fetchAll')
          alert(response.data.message)
          router.push({
            name: 'Dashboard'
          })
        } else {
          commit('SET_EDIT_USER_ERROR', response.data.message)

        }
        commit('SET_LOADING', false)
      } catch (e) {
        commit('SET_LOADING', false)
        console.log(e)
        console.log(e.response)
        commit('SET_EDIT_USER_ERROR', e.response.data.message)
      }
    },

    async canAccess({
      state,
      dispatch
    },) {
      try {
        let user = Object.entries(state.user)
        if (user.length === 0) await dispatch('fetchUserDetails')

        if (state.user.roles.length !== 0) {
          if (state.user.roles[0].name !== Roles.ADMIN) {

            alert('Not allowed to this route')
            router.push({
              name: 'Dashboard'
            })
            return false
          } else if (state.user.roles[0].name === Roles.ADMIN) {
            return true
          }
        }
      } catch (e) {

        console.log(e)
        alert(e)
        return false
      }
    },
    async deleteUser({ commit, dispatch }, payload) {
      try {
        commit('SET_LOADING', true)
        console.log('payload',payload)
        const response = await repository.deleteUser(payload.action.id)

        if (response.status === 200 || response.status === 201) {
          dispatch('fetchAll')
          alert(response.data.message)
          router.push({
            name: 'Dashboard'
          })
        } else {
          alert(response.data.message)

        }
        commit('SET_LOADING', false)
      } catch (e) {
        commit('SET_LOADING', false)
        console.log(e)
        console.log(e.response)
        alert(e.response.data.message)
      }
    }
  },
  namespaced: true
}