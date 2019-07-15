const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')
admin.initializeApp()
const env = functions.config()


const client = algoliasearch(env.algolia.appid, env.algolia.apikey)
const index = client.initIndex('warehouses')
exports.addWarehouseToAlgolia = functions.firestore.document('warehouses/{docId}')
  .onCreate((snap, context) => {
    const data =snap.data()
    const objectId = snap.id

    return index.addObject({
      objectId,
      ...data
    })
  })
exports.removeWarehouseFromAlgolia = functions.firestore.document('warehouses/{docId}')
  .onDelete((snap, context) => {
    const objectId = snap.id

    return index.deleteObject(objectId)
  })
