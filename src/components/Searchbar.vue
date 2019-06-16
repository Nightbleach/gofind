<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 lg5 md5 xl5 class="mb-0 search">
      <v-text-field
        label="go searching..."
        single-line
        outline
        color='orange'
        clearable
        class="searchBar py-0 mb-0 "
        append-icon="fal fa-search"
        autofocus
      >
      </v-text-field>
    </v-flex>
    <v-flex xs12 sm12 lg7 md7 xl7 class="pt-4 explain-text">
      <v-icon small flat color="#54BDAF" class="mt-0">fal fa-exclamation</v-icon>
      <span class="explain-text body-2" >Go search type of goods or even location where you lost them</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Search-algolia',
  data () {
    return {
      select: 'Iphone'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .explain-text
    font-family "Helvetica Neue"
    color #757575
  .v-input__control
    height 37px
  //solve margin & padding overlapping between searchBar and text
@media (max-width: 599px)
  .v-input__control
    height 37px !important
  .explain-text
    font-size 0.8125rem
</style>
