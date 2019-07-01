// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import firebase
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
// End firebase import
import './assets/styles/reset.css'
import './assets/styles/border.css'
import fastClick from 'fastclick'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from './store'
import AlertCmp from './components/Alert'
import '@fortawesome/fontawesome-pro/css/all.css'
import DateFilter from './filter/date'
// import vue-spinner
import VueSweetalert2 from 'vue-sweetalert2'

Vue.filter('date', DateFilter)
Vue.use(VueSweetalert2)
Vue.use(Vuetify, {
  iconfont: 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created () {
  }
})
