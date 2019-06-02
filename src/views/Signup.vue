<template>
<v-container class="signup-con mx-1">
  <v-layout row no-wrap>
    <v-flex xs12 md6>
      <div class="signup-l-text font-weight-bold">Help people to find their treasure ?</div>
      <p>Just upload the thing  and 'where did you find' info you're so kind</p>

    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Signup'
}
</script>

<style lang="stylus" scoped>@import '../stylus/main.styl'

.signup-l-text
  border 1px solid red
  font-family Verdana
  color #3D414A
+for_breakpoint(desktop)
  .signup-l-text
    font-size 1.8rem
    -webkit-transform font-size 0.2s ease-out
+for_breakpoint(tablet)
  .signup-l-text
    font-size 1.3rem
    -webkit-transform font-size 0.2s ease-out
    text-align center
+for_breakpoint(mobile)
  .signup-l-text
    font-size 1rem
    -webkit-transform font-size 0.2s ease-out
    text-align center
</style>
