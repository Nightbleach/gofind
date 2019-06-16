<template>
<v-container>
  <v-layout>
    <v-flex xs12 md8 offset-md2>
      <v-card>
        <v-card-title>
          <div class="title-text headline font-weight-black justify-center">Golly, We Found it !</div>
        </v-card-title>
        <v-img
          :src="warehouse.imageUrl"
          aspect-ratio="1.5"
        >
        </v-img>
        <v-card-text>
          <div class="info--text">Category: {{warehouse.category}}</div>
          <div class="info--text">This was found at: {{warehouse.FoundAt}}</div>
          <div class="info--text">Uploaded date: {{warehouse.UploadDate}}</div>
          <div class="info--text">Contact: {{warehouse.ContactInfo}}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'SingleWarehouse',
  props: ['id'],
  computed: {
    warehouse () {
      return this.$store.getters.loadedWarehouse(this.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-text
  font-family Montserrat !important
  color #FFB300

</style>
