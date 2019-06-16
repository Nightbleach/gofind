export default {
  // Whole Warehouses
  loadedWarehouses (state) {
    return state.loadedWarehouses.sort((warehouseA, warehouseB) => {
      return warehouseA.UploadDate > warehouseB.UploadDate
    })
  },
  // Single Warehouse
  loadedWarehouse (state) {
    return (warehouseId) => {
      return state.loadedWarehouses.find((warehouse) => {
        return warehouse.id === warehouseId
      })
    }
  },
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
