<template>
<v-container fluid grid-list-lg class="pt-1">
  <v-layout row>
    <v-flex xs12 class="pt-0" >
      <v-card>
          <v-img :src="storageBanner" aspect-ratio="5.1"></v-img>
      </v-card>
    </v-flex>
  </v-layout>
  <v-divider class="mt-1 mb-0 pb-0"></v-divider>
  <Searchbar></Searchbar>
  <v-divider></v-divider>
<!--  start product card display-->
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 xl3
              v-for="item in warehouses"
              :key="item.id"
              @click="onLoadWarehouse(item.id)">
        <v-card hover :to="'/LostFoundsWarehouses/' + item.id"
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
                  <v-icon color="#00B0FF" class="mr-2">fal fa-map-marked-alt</v-icon>
                  <span>Found at: {{item.foundAt}}</span>
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
</v-container>
</template>

<script> import Searchbar from '../components/Searchbar'
export default {
  name: 'LostItemStorage',
  components: {
    Searchbar
  },
  data () {
    return {
      storageBanner: require('@/assets/img/1.png'),
      creatorIcon: [
        { id: '1', img: require('@/assets/img/creator-icon/man1.png') }
      ]
    }
  },
  // get data from vuex store
  computed: {
    warehouses () {
      return this.$store.getters.loadedWarehouses
    }
  },
  methods: {
    onLoadWarehouse (id) {
      this.$router.push('/LostFoundsWarehouses/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .creator-icon
    height:24px
  .creator-text
    line-height 24px
    height 24px
  .description-text
    font-family Montserrat
</style>
