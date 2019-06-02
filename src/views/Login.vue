<template>
<v-container>
  <v-layout class="login-layout" row justify-center no-wrap>
    <v-flex xs10 sm7 md7 lg6 class="mt-4">
      <div class="login-text font-weight-bold">Login to your account</div>
      <v-btn large block color="blue accent-2"
             class="white--text mt-4 login-btn mb-4"
             v-for="item in logInBtn" :key="item.name"
      >
        <v-icon left class="">{{item.name}}</v-icon>
        <div class="text-capitalize font-weight-bold subheading">{{item.description}}</div>
      </v-btn>
      <div class="divider01">or</div>
      <v-form>
        <v-text-field
          lazy-validation
          label="Email"
          name="email"
          id="email"
          v-model="email"
          type="email"
          prepend-icon="far fa-envelope"
          required>
        </v-text-field>
        <v-text-field
          lazy-validation
          label="password"
          name="password"
          id="password"
          v-model="password"
          type="password"
          prepend-icon="fas fa-unlock-alt"
          required>
        </v-text-field>
        <v-btn large block flat class="mt-4 headline text-capitalize success font-weight-bold">Login</v-btn>
      </v-form>
      <div class="create-account-text justify-center title mt-5">Don't have an account?<router-link  class="blue--text ml-2 hover-signup" cursor="pointer" tag="a" to="/signup">Signup</router-link></div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      logInBtn: [
        {name: 'fab fa-google', description: 'Continue with Google'},
        {name: 'fab fa-facebook', description: 'Login with Facebook'}
      ]
    }
  }
}
</script>

<style  lang="stylus" scoped>@import '../stylus/main.styl'
.create-account-text
  text-align center
  color: #3D414A
  .hover-signup
    text-decoration none
.hover-signup:hover
  text-decoration underline
// add a divider in login page
.divider01
  padding  0 20px 0;
  margin  21px 0 27px;
  line-height 1px;
  border-left 41px solid #ddd;
  border-right 41px solid #ddd;
  text-align  center;
  color: #9ea6b2
  font-weight bold
// set login title font size
.login-text
  text-align center
  font-family Verdana
+for_breakpoint(desktop)
  .login-text
    font-size 2.25rem
    -webkit-transform font-size 0.2s ease-out
+for_breakpoint(tablet)
  .login-text
    font-size 2rem
    -webkit-transform font-size 0.2s ease-out
+for_breakpoint(mobile)
  .login-text
    font-size 1.5rem
    -webkit-transform font-size 0.2s ease-out

+for_breakpoint(tinymobile)
  .create-account-text
    font-size 1.2rem !important
    margin-top 1.75rem !important
</style>
