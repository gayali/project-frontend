import axios from 'axios'

export default {
  storeToken (token) {
    if (token !== undefined) {
      localStorage.setItem('accessToken', token)
      this.setAuthorizationHeader(token)
      return true
    }
    return false
  },
  isAuthenticated () {
    const token = this.getAccessToken()
    return (token) && token !== ''
  },
  getAccessToken () {
    return localStorage.getItem('accessToken')
  },
  setAuthorizationHeader (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
  clearToken () {
    localStorage.removeItem('accessToken')
    sessionStorage.removeItem('user')
  },
  refreshHeader () {
    if (this.isAuthenticated()) {
      this.setAuthorizationHeader(this.getAccessToken())
    }
  }
}
