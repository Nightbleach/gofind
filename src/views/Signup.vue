<template>
<v-container class="signup-con">
  <v-layout row no-wrap justify-center>
    <v-flex xs12 md6 lg5>
      <div class="signup-l-text mt-1  mb-3 font-weight-black justify-center">Help people to find their treasure ?</div>
      <p class="subheading mt-2 signup-l-text2 wrap">Just upload the thing  and 'where did you find' info</p>
      <p class="subheading mt-2 signup-l-text2 wrap">you're so Kind!</p>
      <v-card>
       <v-container>
         <v-layout>
           <v-flex xs12>
             <v-card color="blue accent-2">
                 <v-card-actions>
                   <v-icon class="white--text pl-2" left>fab fa-google</v-icon>
                   <v-btn flat block class="white--text text-capitalize google-text title font-weight-black">Continue with Google</v-btn>
                 </v-card-actions>
             </v-card>
           </v-flex>
         </v-layout>
         <v-divider class="my-4"></v-divider>
         <div v-if="error">
           <app-alert @dismissed="onDismissed" :text ="error.message" ></app-alert>
         </div>
         <v-layout>
           <v-flex xs12>
                 <v-form @submit.prevent="onSignup">
                   <v-text-field
                     autocomplete="off"
                     label="Enter email"
                     name="email"
                     id="email"
                     v-model="email"
                     type="email"
                     prepend-icon="far fa-envelope"
                     :rules="[rules.email]"
                     >
                   </v-text-field>
                   <v-text-field
                     label="Password"
                     name="password"
                     id="Password"
                     v-model="password"
                     autocomplete="new-password"
                     :type="show1 ? 'text' : 'password'"
                     prepend-icon="fas fa-unlock-alt"
                     @click:append="show1 = !show1"
                     :append-icon="show1 ? ' far fa-eye' : 'far fa-eye-slash'"
                     class="input-group--focused"
                     >
                   </v-text-field>
                   <v-text-field
                     autocomplete="off"
                     label="Confirm password"
                     name="confirmPassword"
                     id="confirmPassword"
                     v-model="confirmPassword"
                     :type="show2 ? 'text' : 'password'"
                     @click:append="show2 = !show2"
                     :append-icon="show2 ? ' far fa-eye' : 'far fa-eye-slash'"
                     prepend-icon="far fa-lightbulb"
                     :rules="[comparePasswords]"
                     >
                   </v-text-field>
                   <p class="policy">(We won't share it with others)</p>
                   <v-btn type="submit" large block flat class="cr-acc mt-4 title text-capitalize success font-weight-bold">Create an account</v-btn>
                 </v-form>

           </v-flex>
         </v-layout>

       </v-container>
      </v-card>
    </v-flex>

    <v-flex class="hidden-sm-and-down img-people-head"  md6 lg4 offset-md1>
      <v-img :src="image" contain  position="bottom center"></v-img>
      <div class="tr">
        <p class="title font-weight-medium pt-5">Help people can:</p>
        <p class="subheading font-weight-regular"><span class="ted fas fa-user-friends pr-2"></span>make us better</p>
        <p class="subheading font-weight-regular"><span class="far fa-star star pr-2"></span>make society better</p>
        <p class="subheading font-weight-regular"><span class="fas fa-globe-asia world pr-2"></span>make world better</p>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      show1: false,
      show2: false,
      image: require('@/assets/img/people-head.png'),
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Sorry, your passwords do not match' : ''
    },
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
    // Signup function that allows user to signup our app
    onSignup () {
      /* Use Vuex to store action mutation auth */
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onDismissed () {
      console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="stylus" scoped>@import '../stylus/main.styl'
.img-people-head
  margin-top 6rem
  .tr
    font-family Montserrat !important
    .ted
      color: #00B0FF
    .world
      color #00C853
    .star
      color #FFD600
.policy
  font-family Montserrat

.cr-acc
  font-family Montserrat !important
.divider01
  padding  0 20px 0;
  margin  21px 0 27px;
  line-height 1px;
  border-left 5px solid #ddd;
  border-right 5px solid #ddd;
  text-align  center;
  color: #9ea6b2
  font-weight bold
.google-text
  font-family Montserrat !important
.signup-l-text
  font-family Montserrat
  color #3D414A
.signup-l-text2
  font-family Montserrat
  line-height 15px
+for_breakpoint(desktop)
  .signup-l-text
    font-size 1.8rem
    -webkit-transform font-size 0.2s ease-out
+for_breakpoint(tablet)
  .signup-l-text
    font-size 1.3rem
    -webkit-transform font-size 0.2s ease-out
    text-align center
    // Sit text style
  .signup-l-text2
    text-align center
+for_breakpoint(mobile)
  .signup-l-text
    font-size 1rem !important
    -webkit-transform font-size 0.2s ease-out
    text-align center
  .signup-l-text2
    text-align center
    font-size 0.8rem !important
    -webkit-transform font-size 0.2s ease-out
</style>
