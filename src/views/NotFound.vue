<template >
    <div class="background">
      <v-img
        :src="image"
        contain
        aspect-ratio="2.0"
        class="img"
        position="center center"
      >
      </v-img>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      image: require('../assets/img/404.png')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .background
    background-color #f1f1f3
</style>
