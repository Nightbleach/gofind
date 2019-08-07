<template>
<v-container fluid grid-list-lg class="pt-1">
  <back-to-top bottom="80px" right="50px" visibleoffset="250">
    <v-btn color="#FFD54F" fab dark>
      <v-icon medium>fal fa-arrow-alt-circle-up</v-icon>
    </v-btn>
  </back-to-top>
  <v-layout column>
    <v-flex xs12>
      <v-tabs grow class="searchResult">
        <v-tab class="text-capitalize">
          Searching results for <div class="ml-1 result">"{{this.search}}"</div>"
        </v-tab>
      </v-tabs>
    </v-flex>
    <v-flex xs12 align-self-center>
      <pulse-loader :loading="loading" color="#70CEE4"></pulse-loader>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="hidden-xs-only">
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
  <v-container class="hidden-sm-and-up pa-0" fluid >
    <v-layout row wrap >
      <v-flex
        xs12
        v-for="item in getWarehouses"
        :key="item.id"
        class="smallScreenCard">
        <v-card flat class="mb-2 grey lighten-5" :to="{name: 'LostFoundsWarehouse', params:{warehouse_note: item.note }}">
          <v-layout>
            <v-flex xs5 class="ml-1">
              <v-img
                :src='item.imageUrl'
                contain
                height="125"
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title  class="px-0">
                <div>
                  <div >
                    <v-icon color="#FFB74D" small class="mr-1">fal fa-stream</v-icon>
                    <span>{{item.category}}</span>
                  </div>
                  <div>
                    <v-icon color="#00B0FF" small class="mr-1">fal fa-map-signs</v-icon>
                    <span>{{item.foundAt}}</span>
                  </div>
                  <div class="mb-2">
                    <v-icon color="#1DE9B6" small class="mr-1">fal fa-clock</v-icon>
                    <span>{{item.UploadDate | date }}</span>
                  </div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
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
import db from '../firebase/firebaseinit'
import BackToTop from 'vue-backtotop'
import Swal from 'sweetalert2'
import PulseLoader from 'vue-spinner/src/PulseLoader'
export default {
  name: 'SearchContentPage',
  components: {
    PulseLoader,
    BackToTop
  },
  data () {
    return {
      storageBanner: require('@/assets/img/1.png'),
      creatorIcon: [
        {id: '1', img: require('@/assets/img/creator-icon/man1.png')}
      ],
      warehouses: [],
      loading: true,
      loader: null,
      loading2: false,
      showLoading2: false,
      search: '',
      seeing: false,
      paging: {
        warehouse_per_page: 12,
        end: false,
        loading: false
      },
      ref: {
        warehouses: null,
        warehousesNext: null
      }
    }
  },
  computed: {
    getWarehouses () {
      return this.warehouses.filter(item => {
        return item.category.toLowerCase().includes(this.search.toLowerCase()) ||
          item.foundAt.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {
    // Watch loader for loading more items from warehouse
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  mounted () {
    this.search = this.$route.query.name
    var searchData = this.warehouses.filter(item => {
      item.category.toLowerCase().includes(this.$route.query.name)
    })
    this.warehouses = searchData
  },
  created () {
    this.ref.warehouses = db.collection('warehouses')
    // .where('category', '==', this.$route.query.name)// 这边应该是就是 this.$route.query.name == 我数据库里面的category吧
      .orderBy('UploadDate', 'desc')
    // load first page
    const firstPage = this.ref.warehouses.limit(this.paging.warehouse_per_page)
    this.handleWarehouses(firstPage)
  },
  methods: {
    loadMore () {
      if (this.paging.end) {
        return
      }
      this.paging.loading = true
      this.loading2 = true // when more data is coming, start loading
      this.handleWarehouses(this.ref.warehousesNext).then((documentSnapshots) => {
        this.paging.loading = false
        this.loading2 = false // When data was fetched, end loading
        if (documentSnapshots.empty) {
          // if there is no more warehouses items to load, set paging.end to true
          Swal.fire({
            text: 'Opps, no more items in our warehouse!',
            confirmButtonColor: '#4FC3F7',
            imageUrl: require('@/assets/img/notification.png')
          })
          this.paging.end = true
        }
      })
    },
    handleWarehouses (ref) {
      // Fetch warehouses of given reference
      return new Promise((resolve, reject) => {
        ref.get().then((documentSnapshots) => {
          /* If documentSnapshots is empty, then we have loaded all of pages */
          if (documentSnapshots.empty) {
            this.paging.end = true
            resolve(documentSnapshots)
          }
          documentSnapshots.forEach((doc) => {
            let warehousesData = doc.data()
            warehousesData.id = doc.id
            this.warehouses.push(warehousesData)
          })
          this.loading = false
          this.showLoading2 = true
          /* Build reference for next page */
          const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1]
          if (!lastVisible) {
            return
          }
          this.ref.warehousesNext = this.ref.warehouses
            .startAfter(lastVisible)
            .limit(this.paging.warehouse_per_page)
          resolve(documentSnapshots)
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .searchResult
    font-family Montserrat
    .result
      color: #42A5F5
</style>
