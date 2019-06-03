<template>
<v-container>
<div @click="submit">Home page</div>
</v-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    submit () {
      console.log('bye bye then')
    }
  }
}
</script>

<style scoped>

</style>
