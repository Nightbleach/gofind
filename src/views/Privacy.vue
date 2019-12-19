<template>
<v-container fluid>
  <v-layout row justify-center no-wrap>
    <v-flex xs12>
      <v-tabs grow slider-color="#f3b8d9" class="privacy-title">
        <v-tab class="privacy-title">
          <div class="text-capitalize" style="font-family: Montserrat,serif">Privacy Policy</div>
        </v-tab>
      </v-tabs>
    </v-flex>
  </v-layout>
    <v-flex xs12 class="mt-2">
      <v-card flat >
        <v-card-title>
          <div>
            <div v-html="privacy_text" class="text-justify privacy-text"></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
</v-container>
</template>

<script>
export default {
  name: 'Privacy',
  data () {
    return {
      privacy_text: 'We are committed to protecting your personal information in accordance with this Privacy  Policy and the Privacy Act 1993 (as amended and replaced from time to time).  ' +
        'If you have any questions, please contact us using the details in the “Contact Us” section below.</br>' +
      '</br>You do not have to provide us, or authorize us to collect, any information that we request, however, if you do not do so it may affect your use of our website </br>' +
        '</br>The personal information that we may collect are: your name, address, phone number or ID;' +
        ' We may use your personal information to process your registration and provide service to you, such as processing reward you help to find item.' +
        ' We do not share personal information to any other party under this Privacy and the Privacy Act.' +
        ' Personal information will be stored in “ the cloud” in secure databases on our behalf by third party based overseas.</br>' +
        '</br> You are responsible for ensuring your Internet browser and computer system are secure and can support any security measures we use to protect your information.</br>' +
        '</br> You can contact us at any time by emailing us at xxxxx@mail.com </br>' +
        '<br> We are committed to protecting your personal information; if you have any questions about this Privacy Policy, please contact us using the details set out above. '
    }
  }
}
</script>

<style lang="stylus" scoped>
.privacy-text
  font-family Montserrat
</style>
