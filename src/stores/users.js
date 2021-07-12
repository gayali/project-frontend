import { RepositoryFactory } from '@/api/repositoryFactory'
import router from '../js/router'
import auth from '../js/helpers/auth'
const repository = RepositoryFactory.get('users')

export default {
  state: {
    user: {},
    isLoggedin: false,
    loading: false,
    loginError: '',
    status: '',
    accessToken: '',
    users:{}
  },
  getters: {
    isLoggedin: (state) => (state.accessToken) && state.accessToken !== '' && state.isLoggedin,
    loginError: (state) => state.loginError,
    loading: (state) => state.loading,
    status: (state) => state.status,
    token: (state) => state.accessToken,
    user: (state) => state.user,
    users:(state)=>state.users
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = {
        ...payload
      }
    },
    SET_USERS(state,payload){
      state.users=payload
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
      commit,
      state,
      dispatch
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
    }, status) {
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
         dispatch('tasks/fetch', { root: true })
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

    logout({ commit, dispatch }) {
      commit('IS_LOGGED_IN', false)
      commit('RESET_TOKEN')
      router.push({
        path: '../login'
      })
      dispatch('components/setModalVisibility', false, { root: true })
      dispatch('setUser',{}) 
      dispatch('setUsers',{})
      dispatch('tasks/setTasks', {},{ root: true })

    },
    setUser({ commit }, payload){
      commit('SET_USER',payload)
    },
    setUsers({ commit }, payload){
      commit('SET_USERS',payload)
    },
    async fetchUserDetails({ commit, dispatch }){
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
    async fetchAll({ commit, dispatch }){
      try {
        const response = await repository.fetchAll()
        if (response.status === 200 || response.status === 201) {
          commit('SET_USERS',response.data.users)
        }
      } catch (e) {
        console.log(e)
        console.log(e.response)
      }
    }

  },
  namespaced: true
}