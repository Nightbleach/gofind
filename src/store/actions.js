/* 包含多个接受组件通知触发mutation调用间接更新状态的方法的对象
* actions存的 一般都是方法 */
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        // use cred instead   before one is user
        cred => {
          commit('setLoading', false)
          const newUser = {
            id: cred.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        // use cred instead   before one is user
        cred => {
          commit('setLoading', false)
          const newUser = {
            id: cred.user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
  },
  clearError ({commit}) {
    commit('clearError')
  },
  createWarehouseItem ({commit}, payload) {
    const warehouseItem = {
      category: payload.category,
      imageUrl: payload.imageUrl,
      foundAt: payload.foundAt,
      note: payload.note,
      UploadDate: payload.UploadDate,
      id: 'asdasdasd'
    }
    // Reach out to firebase and store it
    commit('createWarehouseItem', warehouseItem)
  }
}
