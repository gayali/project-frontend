import Vue from 'vue'
import Router from 'vue-router'
import auth from './helpers/auth'
import store from './store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Login = () => import('@/views/pages/Login')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//Projects
const NewProject = () => import('@/views/projects/NewProject')
const Backlog = () => import('@/views/projects/Backlog')
const Details = () => import('@/views/projects/Details')
const Kanban = () => import('@/views/projects/Kanban')

//Tasks
const NewTask=()=> import('@/views/projects/tasks/NewTask')
const TaskDetails=()=> import('@/views/projects/tasks/TaskDetails')

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
          redirect: '/projects/new',
          name: 'Project',
          component: {
            render (c) { return c('router-view') }
          },
          children: getProjects()
        },
        {
          path: 'tasks',
          name: 'Task',
          component: {
            render (c) { return c('router-view') }
          },
          children: getTasks()
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
      path: 'new',
      name: 'New Project',
      component: NewProject
    },
    {
      path: 'kanban',
      name: 'Kanban',
      component: Kanban
    },
    {
      path: 'backlog',
      name: 'Backlog',
      component: Backlog
    },
    {
      path: 'details',
      name: 'Project Details',
      component: Details
    }
  ]
}

function getTasks(){
  return [
    {
      path: 'newTask',
      name: 'New Task',
      component: NewTask
    },
    {
      path: 'taskDetails',
      name: 'Task Details',
      component: TaskDetails
    },
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