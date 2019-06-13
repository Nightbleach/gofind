// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase/app'
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

Vue.use(Vuetify, {
  iconfont: 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.component('app-alert', AlertCmp)

// const config = {
//   apiKey: 'AIzaSyAVHB45obUoQcdpX0ULufvTjqQPaBfBwis',
//   authDomain: 'gofind-5302b.firebaseapp.com',
//   databaseURL: 'https://gofind-5302b.firebaseio.com',
//   projectId: 'gofind-5302b',
//   storageBucket: 'gofind-5302b.appspot.com',
//   messagingSenderId: '1067284971488',
//   appId: '1:1067284971488:web:fd14e6bf8fe24dfb'
// }
//
// firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVHB45obUoQcdpX0ULufvTjqQPaBfBwis',
      authDomain: 'gofind-5302b.firebaseapp.com',
      databaseURL: 'https://gofind-5302b.firebaseio.com',
      projectId: 'gofind-5302b',
      storageBucket: 'gofind-5302b.appspot.com',
      messagingSenderId: '1067284971488',
      appId: '1:1067284971488:web:fd14e6bf8fe24dfb'
    })
  }
})
