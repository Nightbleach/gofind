<template>
<v-container fluid grid-list-lg>
  <v-layout row>
    <v-flex xs12 class="pt-0" >
      <v-card>
          <v-img :src="storageBanner" aspect-ratio="3.51"></v-img>
      </v-card>
    </v-flex>
  </v-layout>
  <v-divider class="my-4"></v-divider>
 <v-layout row>
   <v-flex>

   </v-flex>
 </v-layout>

  <v-card>
    <v-layout row no-wrap>
      <v-flex xs12 md6 lg4 >abc</v-flex>
    </v-layout>
    <v-layout row no-wrap>
      <v-flex xs12 md6 lg4 >abc</v-flex>
    </v-layout>
    <v-layout row no-wrap>
      <v-flex xs12 md6 lg4 >abc</v-flex>
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: 'LostItemStorage',
  data () {
    return {
      storageBanner: require('@/assets/img/1.png')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
