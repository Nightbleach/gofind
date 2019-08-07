<template>
<v-container>
  <v-layout class="login-layout mt-2" row justify-center no-wrap>
    <v-flex xs12 sm10 md8 lg7 class="mt-5 px-5">
      <div class="login-text font-weight-medium">Login to your account</div>
      <v-btn flat large block
             class="white--text mt-4 login-btn mb-4 social-button light-blue accent-2"
             v-for=" item in logInBtn" :key="item.name"
             @click="socialLogin"
      >
        <v-icon left>{{item.name}}</v-icon>
        <div class="text-capitalize  font-weight-bold subheading">{{item.description}}</div>
      </v-btn>
      <div class="divider01 mb-5">or</div>
      <div>
        <v-alert
          dismissible
          type="error"
          class="alert-text"
          outline
          v-if="errorFeedback"
          v-model="errorFeedback"
        >
          {{errorFeedback}}
        </v-alert>
      </div>
      <v-form @submit.prevent="onLogin" class="mt-3">
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
          label="Password"
          name="password"
          id="password"
          v-model="password"
          type="password"
          prepend-icon="fal fa-lock-alt"
          required>
        </v-text-field>
        <v-btn type="submit" large block flat class="mt-4 headline text-capitalize amber lighten-1 white--text font-weight-bold">Login</v-btn>
      </v-form>
      <div class="create-account-text justify-center subheading mt-5">Don't have an account?<router-link  class="blue--text ml-2 hover-signup" cursor="pointer" tag="a" to="/signup">Signup</router-link></div>
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
      ],
      email: '',
      password: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      errorFeedback: null
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
    onLogin () {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user)
            this.$router.push('/')
          })
          .catch(err => {
            this.errorFeedback = err.message
          })
        this.errorFeedback = null
      } else {
        this.errorFeedback = 'Please fill in both fields'
      }
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
.alert-text
  font-family Montserrat !important
  /*word-break break-all*/
  white-space normal
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
    font-size 2.3rem
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
