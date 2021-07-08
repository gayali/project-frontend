import store from './store'
var requireModule = require.context('@/stores/', true, /\.js$/)

requireModule.keys().forEach(fileName => {
  let file = fileName.substring(fileName.lastIndexOf('/') + 1)
  const moduleConfig = requireModule(fileName)
  const moduleName = file.replace(/\.\w+$/, '')

  store.registerModule(moduleName, moduleConfig.default || moduleConfig)
})
