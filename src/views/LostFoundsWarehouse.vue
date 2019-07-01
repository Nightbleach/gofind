<template>
<v-container class="bImg" fluid>
  <v-layout row>
    <v-flex xs12 md5 lg5 >
      <v-card style="opacity: 0.5%">
        <v-card-title>
          <div class="title-text headline font-weight-black justify-center">Golly, We Found it !</div>
        </v-card-title>
        <v-img
          v-if="warehouse"
          :src="warehouse.imageUrl"
          aspect-ratio="1.5"
        >
        </v-img>
        <v-layout>
          <v-flex xs8>
            <v-card-text v-if="warehouse">
              <div class="info--text">Category: {{warehouse.category}}</div>
              <div class="info--text">This was found at: {{warehouse.foundAt}}</div>
              <div class="info--text">Uploaded date: {{warehouse.UploadDate | date }}</div>
              <div class="info--text">Note: {{warehouse.note}}</div>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  color="#FFD54F" class="subheading font-weight-medium text-capitalize comment mt-4">Comments</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import db from '../firebase/firebaseinit'
export default {
  name: 'SingleWarehouse',
  props: ['id'],
  data () {
    return {
      warehouse: null
    }
  },
  created () {
    let ref = db.collection('warehouses').where('note', '==', this.$route.params.warehouse_note)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.warehouse = doc.data()
        this.warehouse.id = doc.id
      })
    })
  }

}
</script>

<style lang="stylus" scoped>
.bImg
  background-image url("../assets/img/pablo-sign-up.png")
  background-repeat no-repeat
  background-size cover
.title-text
  font-family Montserrat !important
  color #FFB300
.comment
  font-family Montserrat
  color: #fff
</style>
