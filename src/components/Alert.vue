<template>
    <v-alert
      @input="onClose"
      dismissible
      type="error"
      :value="true"
      class="alert-text"
      outline
    >
      {{text}}
    </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="stylus" scoped>
.alert-text
  font-family Montserrat !important
  /*word-break break-all*/
  white-space normal

</style>
