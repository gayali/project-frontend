import axios from '../repository'
import auth from '../../js/helpers/auth'
import qs from 'qs'

export const get = async (url) => {
  auth.refreshHeader()
  return axios({
    method: 'GET',
    url
  })
}

export const post = async (url, data) => {
  auth.refreshHeader()
  return axios({
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      ...data
    })
  })
}

export const upload = async (url, data, config) => {
  auth.refreshHeader()
  axios.post(url, data, config)
}
export const put = async (url, data) => {
  auth.refreshHeader()
  return axios({
    method: 'PUT',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      ...data
    })
  })
}
