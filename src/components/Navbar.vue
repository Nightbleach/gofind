<template>
  <nav>
    <v-navigation-drawer class="lime lighten-5"  width="270" temporary app v-model="navDrawer">
      <v-list class="draw-gofind pa-0 mt-1">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon medium class="">fa-user-astronaut</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="title draw-title" to="/">GoFind</v-list-tile-title>
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
    <v-toolbar flat class="light-blue accent-3">
      <v-toolbar-title class="ml-0 logo-text">
        <router-link to="/" tag="span" style="cursor: pointer">
        <v-icon large left  color="white" class="mt-1 brand-logo">fa-user-astronaut</v-icon>
        <span class="font-weight-bold white--text brand-text ml-0">GoFind</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="login-font mr-3 mt-1">
        <v-btn flat color="white" @click="searchInput">
          <v-icon class="search-icon" right>fas fa-search</v-icon>
        </v-btn>
        <v-btn flat color="white" class="hidden-xs-only">
          <router-link to="/login" tag="span">
            <v-icon left>far fa-user</v-icon>
            <span class="title text-capitalize nav-login-text">Login</span>
          </router-link>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon class="white--text hidden-sm-and-up" @click.stop="navDrawer=!navDrawer"></v-toolbar-side-icon>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      navDrawer: false,
      drawerLists: [
        {icon: 'fa-user-astronaut', title: 'Search your treasure', route: '/'},
        {icon: 'fas fa-child', title: 'Sign in', route: '/login'},
        {icon: 'fas fa-user-plus', title: 'Sign up', route: '/signup'}
      ]
    }
  }
  // methods : {
  //   searchInput () {
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.nav-login-text
  font-family Montserrat !important
.draw-title
  height: 19px
  font-family Verdana
.brand-text
  font-family American Typewriter
  font-size 2rem
  @media (max-width: 767.98px)
    font-size 1.5rem
@media (max-width: 767.98px)
  .logo-text
    margin-left -2rem
  .brand-logo
    font-size 1rem
@media (min-width: 320px) and (max-width: 480px)
  .logo-text
    margin-left -2.5rem
</style>
