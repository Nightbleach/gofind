/* Vuex */
import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
