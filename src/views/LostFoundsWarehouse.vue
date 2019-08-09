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
                @click='onClick(warehouse)'
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
          aspect-ratio="1.41"
          class="mb-4"
        >
        </v-img>
        <v-form @submit.prevent="enterComment" ref="form" v-model="valid">
          <v-text-field
            autocomplete="off"
            label="Enter your Alias: "
            name="Alias"
            prepend-inner-icon="fal fa-file-signature"
            v-model="alias"
            :rules="nameRules"
            class="mb-4"
            :counter="12"
            lazy-validation
          >
          </v-text-field>
          <v-alert outline class="mt-0" type="error" dismissible v-if="feedback" v-model="feedback">{{feedback}}</v-alert>
          <v-btn type="submit" :disabled="!valid" @click="validate" block color="#20C1E6" class="subheading white--text text-capitalize enterComment mb-3">Enter Comments</v-btn>
        </v-form>
      </v-card>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import db from '../firebase/firebaseinit'
// import firebase from 'firebase'
export default {
  name: 'SingleWarehouse',
  data () {
    return {
      warehouse: null,
      feedback: null,
      CommentImage: require('@/assets/img/comment-img.jpg'),
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
      slug: null,
      valid: true
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
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    enterComment () {
      if (this.alias) {
        this.$router.push({name: 'Comments', params: {alias: this.alias}})
      }
    },
    onClick (item) {
      this.showWelcome = !this.showWelcome
      sessionStorage.userid = item.id
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
