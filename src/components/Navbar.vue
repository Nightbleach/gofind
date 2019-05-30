<template>
  <nav>
    <v-navigation-drawer temporary app v-model="navDrawer">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat class="light-blue darken-1">
      <v-toolbar-title class="ml-0 logo-text">
        <router-link to="/" tag="span" style="cursor: pointer">
        <v-icon large left  color="white" class="mt-1 brand-logo">fa-user-astronaut</v-icon>
        <span class="font-weight-bold white--text brand-text ml-0">GoFind</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="login-font mr-3 mt-1">
        <v-btn flat color="white">
          <v-icon class="search-icon" right>fas fa-search</v-icon>
        </v-btn>
        <v-btn flat color="white" class="hidden-xs-only">
          <router-link to="/login" tag="span">
            <v-icon left>far fa-user</v-icon>
          <span class="title text-capitalize">Login</span>
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
      navDrawer: false
    }
  }
}
</script>

<style lang="stylus" scoped>
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
