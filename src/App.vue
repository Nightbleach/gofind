<template>
 <v-app class="grey lighten-4">
  <Navbar></Navbar>
   <v-content>
     <vue-page-transition name="fade">
       <router-view/>
     </vue-page-transition>
   </v-content>
  </v-app>
</template>

<script>import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
