/* 包含多个接受组件通知触发mutation调用间接更新状态的方法的对象
* actions存的 一般都是方法 */
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

export default {
  // signUserUp ({commit}, payload) {
  //   commit('setLoading', true)
  //   commit('clearError')
  //   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(
  //       // use cred instead   before one is user
  //       cred => {
  //         commit('setLoading', false)
  //         const newUser = {
  //           id: cred.user.uid
  //         }
  //         commit('setUser', newUser)
  //       }
  //     )
  //     .catch(
  //       error => {
  //         commit('setLoading', false)
  //         commit('setError', error)
  //         console.log(error)
  //       }
  //     )
  // },
  // signUserIn ({commit}, payload) {
  //   commit('setLoading', true)
  //   commit('clearError')
  //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  //     .then(
  //       // use cred instead   before one is user
  //       cred => {
  //         commit('setLoading', false)
  //         const newUser = {
  //           id: cred.user.uid
  //         }
  //         commit('setUser', newUser)
  //       }
  //     )
  //     .catch(
  //       error => {
  //         commit('setLoading', false)
  //         commit('setError', error)
  //         console.log(error)
  //       }
  //     )
  // }
  // autoSignIn ({commit}, payload) {
  //   commit('setUser', {id: payload.user.uid})
  // },
  // clearError ({commit}) {
  //   commit('clearError')
  // }
}
