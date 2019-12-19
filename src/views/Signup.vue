<template>
<v-container class="signup-con" fluid>
  <v-layout row no-wrap justify-center class="mt-1">
    <v-flex xs12 md6 lg5 offset-md1 class="mt-3">
      <div class="signup-l-text mt-2  mb-3 font-weight-bold justify-center">Help people to find their treasure ?</div>
      <p class="subheading mt-2 signup-l-text2 wrap">Just upload the item  and 'where did you find' info</p>
      <p class="subheading mt-2 signup-l-text2 wrap">you're so Kind!</p>
      <v-card>
       <v-container>
         <v-layout>
           <v-flex xs12>
             <v-card color="blue accent-2" flat>
                 <v-card-actions class="light-blue accent-2" >
                   <v-icon class="white--text pl-2" left>fab fa-google</v-icon>
                   <v-btn @click="socialLogin" flat block class="white--text  text-capitalize google-text title font-weight-black">Continue with Google</v-btn>
                 </v-card-actions>
             </v-card>
           </v-flex>
         </v-layout>
         <v-divider class="my-4"></v-divider>
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
         <v-layout>
           <v-flex xs12>
                 <v-form @submit.prevent="onSignup">
                   <v-text-field
                     autocomplete="off"
                     label="Alias"
                     name="Alias"
                     prepend-icon="fal fa-file-signature"
                     v-model="alias"
                     :rules="nameRules"
                   >
                   </v-text-field>
                   <v-text-field
                     autocomplete="off"
                     label="Enter email"
                     name="email"
                     id="email"
                     v-model="email"
                     type="email"
                     prepend-icon="fal fa-envelope-open-text"
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
                     prepend-icon="fal fa-lock-alt"
                     @click:append="show1 = !show1"
                     :append-icon="show1 ? ' far fa-eye' : 'fal fa-eye-slash'"
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
                     :append-icon="show2 ? ' far fa-eye' : 'fal fa-eye-slash'"
                     prepend-icon="fal fa-lightbulb-on"
                     :rules="[comparePasswords]"
                     >
                   </v-text-field>
                   <p class="policy">(We won't share it with others)</p>
                   <v-btn type="submit" large block flat class="cr-acc mt-4 title text-capitalize amber lighten-1 font-weight-bold white--text">Create an account</v-btn>
                 </v-form>

           </v-flex>
         </v-layout>

       </v-container>
      </v-card>
    </v-flex>

    <v-flex class="hidden-sm-and-down img-people-head mt-5"  md6 lg4 offset-md1>
      <div>
      <v-img :src="image" width="380" contain  position="bottom center"></v-img>
      <div class="tr">
        <p class="title font-weight-medium pt-5">Help people can:</p>
        <p class="subheading font-weight-regular"><span class="ted fal fa-people-carry pr-2"></span>make us better</p>
        <p class="subheading font-weight-regular"><span class="fal fa-city pr-2" style="color:orange;"></span>make society better</p>
        <p class="subheading font-weight-regular"><span class="fal fa-globe-asia world pr-2"></span>make world better</p>
      </div>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseinit'
import slugify from 'slugify'
export default {
  name: 'Signup',
  data () {
    return {
      show1: false,
      show2: false,
      image: require('@/assets/img/logup-head.jpg'),
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      nameRules: [
        v => !!v || 'Alias is required',
        v => (v && v.length <= 12) || 'Alias must be less than 12 characters'
      ],
      errorFeedback: null,
      alias: null,
      slug: null
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Sorry, your passwords do not match' : ''
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
      // new way to let user signUp
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.errorFeedback = 'This alias already exists'
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  user_id: cred.user.uid
                })
              }).then(() => {
                this.$router.push('/')
              })
              .catch(err => {
                this.errorFeedback = err.message
              })
          }
        })
      } else {
        this.errorFeedback = 'You must fill all fields'
      }
    },
    // Login with google
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

<style lang="stylus" scoped>@import '../stylus/main.styl'
.alert-text
  font-family Montserrat !important
  /*word-break break-all*/
  white-space normal
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
  font-family Montserrat
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
  font-family Montserrat
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
