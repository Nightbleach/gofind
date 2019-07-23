<template>
<v-container fluid grid-list-lg class="pt-1">
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 xl3
            v-for="item in getWarehouses"
            :key="item.id"
    >
      <v-card hover :to="{name: 'LostFoundsWarehouse', params:{warehouse_note: item.note }}"
      >
        <v-img
          :src='item.imageUrl'
          aspect-ratio="1.6"
        >
        </v-img>
        <v-card-text>
          <div class="description-text subheading">
            <div class="mb-2">
              <v-icon color="#FFB74D" class="mr-2">fal fa-acorn</v-icon>
              <span>Category: {{item.category}}</span>
            </div>
            <div class="mb-2">
              <div>
                <v-icon color="#00B0FF" class="mr-2">fal fa-map-marked-alt</v-icon>
                <span>Found at: {{item.foundAt}}</span>
              </div>
            </div>
            <div class="mb-2">
              <v-icon color="#1DE9B6" class="mr-2">fal fa-clock</v-icon>
              <span>Uploaded date: {{item.UploadDate | date }}</span>
            </div>
            <div class="mb-2">
              <v-icon color="#E57373" class="mr-2">fal fa-clipboard</v-icon>
              <span>{{item.note}}</span>
            </div>
          </div>
          <v-divider class="pt-0"></v-divider>
          <v-container class="mx-0 my-0 px-0 py-0">
            <v-layout row >
              <v-flex xs2 class="pl-4" v-for="image in creatorIcon" :key="image.id">
                <img class="creator-icon" :src='image.img' alt="">
              </v-flex>
              <v-flex xs10 class="ml-0 pl-0 mb-0">
                <p class="creator-text pt-0" >BY A Beautiful Mind</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout justify-center row v-show="showLoading2">
    <v-flex shrink>
      <v-btn
        round
        :loading='loading2'
        @click="loadMore"
        color="#FFD54F"
        class="white--text text-capitalize">more items from our warehouse ...
        <template v-slot:loader>
        <span class="custom-loader">
          <v-icon dark>fal fa-spinner</v-icon>
        </span>
        </template>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'SearchContentPage'
}
</script>

<style scoped>

</style>
