<template>
<v-container class="bImg" fluid>
  <v-layout row wrap justify-space-around>
    <v-flex xs12 md5 lg5 >
      <v-card>
        <v-card-title>
          <div class="title-text headline font-weight-black justify-center">Golly, We Found it !</div>
        </v-card-title>
        <v-img
          v-if="warehouse"
          :src="warehouse.imageUrl"
          aspect-ratio="1.5"
        >
        </v-img>
        <v-layout row wrap>
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
              <v-btn
                color="#FFD54F"
                class="subheading font-weight-medium text-capitalize comment mt-4"
                @click="showWelcome = !showWelcome"
              >Comments</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 md5 lg5 v-show="showWelcome">
      <v-card class="px-4 py-4">
        <v-img
          :src="welcomeImage"
          aspect-ratio="1.5"
          class="mb-4"
        >
        </v-img>
        <form @submit.prevent="enterComment">
          <v-text-field
            autocomplete="off"
            label="Enter your Alias: "
            name="Alias"
            prepend-inner-icon="fal fa-file-signature"
            v-model="alias"
            :rules="nameRules"
            class="mb-4"
            lazy-validation
          >
          </v-text-field>
          <v-alert outline class="mt-0" type="error" dismissible v-if="feedback" v-model="feedback">{{feedback}}</v-alert>
          <v-btn type="submit" block color="#20C1E6" class="subheading white--text text-capitalize enterComment mb-3">Enter Comments</v-btn>
        </form>
      </v-card>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import db from '../firebase/firebaseinit'
import slugify from 'slugify'
// import firebase from 'firebase'
export default {
  name: 'SingleWarehouse',
  data () {
    return {
      warehouse: null,
      feedback: null,
      CommentImage: require('@/assets/img/comment-img.png'),
      commentIcon: require('@/assets/img/comment-icon.png'),
      user: null,
      userInfo: null,
      showComments: false,
      showWelcome: false,
      alias: null,
      welcomeImage: require('@/assets/img/welcome.png'),
      nameRules: [
        v => !!v || 'Alias is required',
        v => (v && v.length <= 12) || 'Alias must be less than 12 characters'
      ],
      slug: null
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
  },
  methods: {
    enterComment () {
      if (this.alias) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('comments').doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'This alias already exists'
          } else {
            this.feedback = 'this alias is free to use! '
          }
        })
        this.$router.push({name: 'Comments', params: {alias: this.alias}})
      } else if (this.alias.stringLength() >= 12) {
        this.feedback = 'Alias must be less than 12 characters'
      } else {
        this.feedback = 'You must enter an alias to add comments'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.bImg
  background-image url("../assets/img/pablo-sign-up.png")
  background-repeat no-repeat
  background-size cover
  height 100%
.title-text
  font-family Montserrat !important
  color #FFB300
.comment
  font-family Montserrat
  color: #fff
.comment-title
  font-family Montserrat
</style>
