// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import fastClick from 'fastclick'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import '@fortawesome/fontawesome-pro/css/all.css'
import DateFilter from './filter/date'
import VueSweetalert2 from 'vue-sweetalert2'
import InstantSearch from 'vue-instantsearch'
import VuePageTransition from 'vue-page-transition'
import VueChatScroll from 'vue-chat-scroll'
import VueAutosuggest from 'vue-autosuggest'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.filter('date', DateFilter)
Vue.use(Vue2TouchEvents)
Vue.use(VueAutosuggest)
Vue.use(InstantSearch)
Vue.use(VueSweetalert2)
Vue.use(VuePageTransition)
Vue.use(VueChatScroll)
Vue.use(Vuetify, {
  iconfont: 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})

fastClick.attach(document.body)
Vue.config.productionTip = false

let app = null
// Wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  // init app if not already created
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {App},
      template: '<App/>'
    })
  }
})
