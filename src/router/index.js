import { createRouter, createWebHistory, routeLocationKey, RouterView } from 'vue-router'
import store from  '../store'

import Home from '../views/Home.vue'

import Signup from '../views/signup.vue'
import Login from '../views/login.vue'
import Dashboard from '../views/dashboard.vue'
import AddPerson from '../views/addperson.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/log-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/addperson',
    name: 'AddPerson',
    component: AddPerson,
    meta: {
      requireLogin: true
    }    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
     next('/log-in')
   } else {
     next()
   }
})

export default router
