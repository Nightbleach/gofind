import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import LostFoundsWarehouses from '../views/LostFoundsWarehouses'
import LostFoundsWarehouse from '../views/LostFoundsWarehouse'

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
      path: '/lostFoundsWarehouses',
      name: 'LostFoundsWarehouses',
      component: LostFoundsWarehouses
    },
    {
      path: '/LostFoundsWarehouses/:id',
      props: true,
      name: 'LostFoundsWarehouse',
      component: LostFoundsWarehouse

    }
  ],
  mode: 'history'
})
