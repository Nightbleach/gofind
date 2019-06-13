<template>
<v-container>
  <v-layout class="login-layout mt-2" row justify-center no-wrap>
    <v-flex xs10 sm7 md7 lg6 class="mt-5">
      <div class="login-text font-weight-bold">Login to your account</div>
      <v-btn large block color="blue accent-2"
             class="white--text mt-4 login-btn mb-4 social-button"
             v-for=" item in logInBtn" :key="item.name"
             @click="socialLogin"
      >
        <v-icon left>{{item.name}}</v-icon>
        <div class="text-capitalize font-weight-bold subheading">{{item.description}}</div>
      </v-btn>
      <div class="divider01 mb-5">or</div>
      <div v-if="error">
        <app-alert @dismissed="onDismissed" :text ="error.message" ></app-alert>
      </div>
      <v-form @submit.prevent="onSignin" class="mt-3">
        <v-text-field
        lazy-validation
        autocomplete="off"
        label="Email"
        name="email"
        id="email"
        v-model="email"
        type="email"
        prepend-icon="fal fa-envelope-open-text"
        :rules="[rules.email]"
        >
      </v-text-field>
        <v-text-field
          lazy-validation
          label="password"
          name="password"
          id="password"
          v-model="password"
          type="password"
          prepend-icon="fal fa-lock-alt"
          required>
        </v-text-field>
        <v-btn type="submit" large block flat class="mt-4 headline text-capitalize success font-weight-bold">Login</v-btn>
      </v-form>
      <div class="create-account-text justify-center title mt-5">Don't have an account?<router-link  class="blue--text ml-2 hover-signup" cursor="pointer" tag="a" to="/signup">Signup</router-link></div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
      logInBtn: [
        {name: 'fab fa-google', description: 'Continue with Google'}
        // {name: 'fab fa-facebook', description: 'Login with Facebook'}
      ],
      email: '',
      password: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    // Get user info from store=> getters
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  // If user had logged in , then it will route to the home page
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    // Signin function that allows user to signin our app
    onSignin () {
      /* Use Vuex to store action mutation auth */
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    },
    socialLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('/')
      }).catch((err) => {
        alert('Oops.' + err.message())
      })
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
  font-family Montserrat
+for_breakpoint(desktop)
  .login-text
    font-size 2.55rem
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
