import Vue from 'vue'
import store from './store'
import { upperFirst } from './helpers/string'

var requireComponent = require.context('@/views/components', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  let file = fileName.substring(fileName.lastIndexOf('/') + 1)
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(file.replace(/\.\w+$/, '')
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})


var requireModule = require.context('@/stores/', true, /\.js$/)

requireModule.keys().forEach(fileName => {
  let file = fileName.substring(fileName.lastIndexOf('/') + 1)
  const moduleConfig = requireModule(fileName)
  const moduleName = file.replace(/\.\w+$/, '')

  store.registerModule(moduleName, moduleConfig.default || moduleConfig)
})