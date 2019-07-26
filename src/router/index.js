import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import LostFoundsWarehouses from '../views/LostFoundsWarehouses'
import LostFoundsWarehouse from '../views/LostFoundsWarehouse'
import NotFound from '../views/NotFound'
import Comments from '../components/Comments'
import SearchContentPage from '../views/SearchContentPage'

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
      component: Login,
      meta: {transition: 'fade-in-up'}
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {transition: 'fade-in-right'}
    },
    {
      path: '/lostFoundsWarehouses',
      name: 'LostFoundsWarehouses',
      component: LostFoundsWarehouses
    },
    {
      path: '/LostFoundsWarehouse/:warehouse_note',
      props: true,
      name: 'LostFoundsWarehouse',
      component: LostFoundsWarehouse
    },
    {
      path: '/SearchContentPage',
      props: true,
      name: 'SearchContentPage',
      component: SearchContentPage
    },
    {
      path: '/LostFoundsWarehouses/:warehouse_note/comment',
      name: 'Comments',
      component: Comments,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.alias) {
          next()
        } else {
          next({name: 'LostFoundsWarehouses'})
        }
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
