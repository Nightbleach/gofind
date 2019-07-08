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
                @click="showComments = !showComments"
              >Comments</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 md5 lg5 v-show="showComments">
      <v-card>
        <v-img
          :src='CommentImage'
          height="70"
        >
        </v-img>
        <v-card-title v-if="warehouse" class="pb-1 comment-title">The latest comments about the {{warehouse.category}}</v-card-title>
        <v-divider class="my-1"></v-divider>
        <v-card-text class="pl-0 pt-0" >
          <v-list>
            <v-list-tile class="pl-0">
              <v-list-tile-avatar>
                <img :src="commentIcon" alt="">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="comment-text grey--text" >comments</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <div class="px-2">
          <form @submit.prevent="addComment">
            <v-text-field
              label="Add a comment"
              name="comment"
              outline
              clearable
              full-width
              autocomplete="off"
              v-model="newComment"
            >
            </v-text-field>
            <p v-if="feedback">{{feedback}}</p>
          </form>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import db from '../firebase/firebaseinit'
import firebase from 'firebase'
export default {
  name: 'SingleWarehouse',
  data () {
    return {
      warehouse: null,
      newComment: null,
      feedback: null,
      CommentImage: require('@/assets/img/comment-img.png'),
      commentIcon: require('@/assets/img/comment-icon.png'),
      user: null,
      userInfo: null,
      showComments: false
    }
  },
  created () {
    let ted = db.collection('warehouses').where('note', '==', this.$route.params.warehouse_note)
    ted.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.warehouse = doc.data()
        this.warehouse.id = doc.id
      })
    })
    ted.doc(this.$route.params.warehouse_note).get()
      .then(user => {
        this.this.userInfo = user.data()
      })
    let ref = db.collection('users')
    // get current user that used for comment name
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data()
          this.user.id = doc.id
        })
      })
    // ref.doc(this.$router.params.warehouse_note).get()
    //   .then(user => {
    //     this.userInfo = user.data()
    //   })
  },
  methods: {
    addComment () {
      if (this.newComment) {
        this.feedback = null
        db.collection('comments').add({
          to: this.$router.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You must enter a comment to add it'
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
