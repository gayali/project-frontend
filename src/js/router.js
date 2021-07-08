import Vue from 'vue'
import Router from 'vue-router'
import auth from './helpers/auth'
import store from './store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')



const router=new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'projects',
          redirect: '/projects/1',
          name: 'Project',
          component: {
            render (c) { return c('router-view') }
          },
          children: getProjects()
        },
      
      ]
    },
    {
      path: '/',
      name: 'page',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
      
      ]
    },
   
   
  ]
}
function getProjects(){
  return [
    {
      path: '404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '500',
      name: 'Page500',
      component: Page500
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    }
  ]
}

router.beforeEach((to, from, next) => {
  if (auth.isAuthenticated()) {
   if(to.fullPath==="/login" || to.fullPath==="/") {
    next({ name: 'Dashboard' })
   }
    store.dispatch('users/fetch')
  }else if(to.fullPath!=="/login"){
    next({ name: 'login' })
  }
  // If the user is not authenticated, he/she will be redirected to the login page
  if (to.matched.some(m => m.meta.protected) && !auth.isAuthenticated()) {
    auth.clearToken()
    next({ name: 'login' })
  } else {
    next()
  }

  next()
})
Vue.use(Router)
export default router