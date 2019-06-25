/* 包含多个action触发去直接更新状态的方法的对象 */
export default {
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  },
  createWarehouseItem (state, payload) {
    state.loadedWarehouses.push(payload)
  }
}
