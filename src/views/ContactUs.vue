<template>
  <v-container fluid>
    <v-layout row justify-center no-wrap>
      <v-flex xs12>
        <v-tabs grow slider-color="#a4d9d6" class="contact-title">
          <v-tab class="contact-title">
            <div class="text-capitalize" style="font-family: Montserrat,serif">Contact us</div>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="mt-2">
      <v-card flat >
        <v-card-title>
          <div>
            <div v-html="contact_text" class="text-justify contact-text"></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'ContactUs',
  data () {
    return {
      contact_text: ' You can contact us at any time by emailing us at xxxxx@mail.com </br>'
    }
  }
}
</script>

<style lang="stylus" scoped>
.contact-text
  font-family Montserrat
</style>
