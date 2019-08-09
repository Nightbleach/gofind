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
                  disabled
                >Comments</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 md5 lg5>
        <v-card>
          <v-img
            :src='CommentImage'
            height="70"
          >
          </v-img>
          <v-card-title v-if="warehouse" class="pb-1 comment-title">The latest comments about the {{warehouse.category}}</v-card-title>
          <v-divider class="my-1"></v-divider>
          <v-card-text class="pl-0 pt-0 commentArea" v-chat-scroll >
            <v-list three-line v-for="comment in Comments" :key="comment.id" class="py-0">
              <v-list-tile class="pl-0">
                <v-list-tile-avatar>
                  <img :src="commentIcon" alt="">
                </v-list-tile-avatar>
                <v-list-tile-content >
                  <span class="comment-text grey--text ">{{comment.alias}}: {{comment.content}} </span>
                  <v-list-tile-title class="time-text grey--text pt-0" >{{comment.time}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <div class="px-2" >
            <add-comment :alias="alias"></add-comment>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../firebase/firebaseinit'
import AddComment from '../components/AddComment'
import moment from 'moment'
// import firebase from 'firebase'
export default {
  name: 'SingleWarehouse',
  props: ['alias'],
  components: {
    AddComment
  },
  data () {
    return {
      warehouse: null,
      Comments: [],
      feedback: null,
      CommentImage: require('@/assets/img/comment-img.jpg'),
      commentIcon: require('@/assets/img/comment-icon.png'),
      user: null,
      userInfo: null
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
    let refComments = db.collection('comments').where('userId', '==', sessionStorage.userid)
    refComments.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc
          this.Comments.push({
            alias: doc.data().alias,
            content: doc.data().content,
            time: moment(doc.data().time).format('lll')
          })
        }
      })
    })
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .commentArea
    max-height 300px
    overflow auto
  .commentArea::-webkit-scrollbar
    width: 3px
  .commentArea::-webkit-scrollbar-track
    background #ddd
  .commentArea::-webkit-scrollbar-thumb
    background #aaa
  .time-text
    font-size:0.6rem
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
