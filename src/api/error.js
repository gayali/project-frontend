export const errorHandler = (component, error) => {
  console.log('ERROR IN COMPONENT:')
  console.log(component.$options.name)

  let message = ''

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    message = error.response.data.error.message
  } else if (error.request) {
    console.log('error.request')

    message = error.message
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    console.log('error.message')
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    message = error.message
  }

  console.log(message)
}

export default {
  errorHandler
}
