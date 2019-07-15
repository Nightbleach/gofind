<template>
    <form @submit.prevent="addComment">
      <v-alert v-if="feedback" v-model="feedback" dismissible class="comment-error white--text">{{feedback}}</v-alert>
      <v-text-field
        label="New comment (Enter to add)"
        name="comment"
        outline
        clearable
        full-width
        autocomplete="off"
        v-model="newComment"
        class="mb-0 pb-0"
      >
      </v-text-field>
    </form>
</template>

<script>
import db from '../firebase/firebaseinit'
export default {
  name: 'AddComment',
  props: ['alias'],
  data () {
    return {
      newComment: null,
      feedback: null
    }
  },
  methods: {
    addComment () {
      if (this.newComment) {
        db.collection('comments').add({
          alias: this.alias,
          content: this.newComment,
          time: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newComment = null
        this.feedback = null
      } else {
        this.feedback = 'You must write a comment...'
      }
    }
  }
}
</script>

<style  lang="stylus" scoped>
.comment-error
  font-family Montserrat
</style>
