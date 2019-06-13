import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import LostItemStorage from '../views/LostItemStorage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/lostitemstorage',
      name: 'Lostitemstorage',
      component: LostItemStorage
    }
  ],
  mode: 'history'
})
