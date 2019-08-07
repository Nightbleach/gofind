<template>
  <nav class="nav-height">
    <v-navigation-drawer class="lime lighten-5"  width="270" temporary app v-model="navDrawer">
      <v-list class="draw-gofind pa-0 mt-1">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon medium class="">fa-user-astronaut</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="title draw-title" to="/">Lostfounds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider class="ma-0" inset>or</v-divider>
      <v-list>
        <v-list-tile v-for="item in drawerLists" :key="item.icon" :to="item.route">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-regular">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar  height="62px !important" flat class="light-blue accent-3 nav-color">
      <v-toolbar-title class="logo-text mt-2">
        <router-link to="/" tag="span" style="cursor: pointer">
        <v-icon large left  color="white" class="brand-logo">far fa-user-astronaut</v-icon>
        <span class="font-weight-bold white--text brand-text">Lostfounds</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="login-font mr-3 mt-1">
        <v-btn flat color="white" class="hidden-xs-only">
          <router-link to="/lostFoundsWarehouses" tag="span">
            <v-icon right>fal fa-warehouse</v-icon>
          </router-link>
        </v-btn>
        <v-btn flat color="white" class="hidden-xs-only" v-if="!user">
          <router-link to="/login" tag="span">
            <v-icon left>fal fa-user</v-icon>
            <span class="title text-capitalize nav-login-text">Login</span>
          </router-link>
        </v-btn>
        <v-btn v-if="user" flat color="white" class="hidden-xs-only" @click="logOut">
            <v-icon left>fal fa-sign-out</v-icon>
            <span class="title text-capitalize nav-login-text">Log out</span>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon class="white--text hidden-sm-and-up mt-2" @click.stop="navDrawer=!navDrawer"></v-toolbar-side-icon>
    </v-toolbar>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data () {
    return {
      searchMenuVisibility: false,
      openSearch: false,
      showText: false,
      search: null,
      navDrawer: false,
      drawerLists: [
        {icon: 'fal fa-warehouse', title: 'Check our Warehouse', route: '/lostFoundsWarehouses'},
        {icon: 'fal fa-search', title: 'Search your treasure', route: '/'},
        {icon: 'fas fa-child', title: 'Sign in', route: '/login'},
        {icon: 'fas fa-user-plus', title: 'Sign up', route: '/signup'}
      ],
      user: null
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    callItBack () {
      alert('function called')
    },
    logOut () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signup')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>@import '../stylus/main.styl'
  .nav-login-text
    font-family Montserrat !important
    line-height 64px
  .draw-title
    height: 19px
    font-family Verdana
  .brand-text
    font-family American Typewriter
    font-size 2rem
    line-height 64px
    @media (max-width: 767.98px)
      font-size 1.5rem
  @media (max-width: 767.98px)
    .logo-text
      margin-left -2rem
      line-height 64px
      text-indent -10px
    .brand-logo
      font-size 1rem
  @media (min-width: 320px) and (max-width: 480px)
    .logo-text
      line-height 64px
      margin-left -2.5rem
      text-indent -13px

</style>
