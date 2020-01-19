<template>
  <v-container fluid>
    <v-layout row justify-center no-wrap>
      <v-flex xs12>
        <v-tabs grow slider-color="#FDB350" class="privacy-title">
          <v-tab class="privacy-title">
            <div style="font-family: Montserrat,serif">FAQ</div>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-flex xs12 class="mt-2">
      <v-expansion-panel class="elevation-0"  focusable>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="question-text font-weight-bold">What is our website used for ?</div>
          </template>
          <v-card>
            <v-card-text class="qText">{{websiteDes}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="qText font-weight-bold">How to use our app ?</div>
          </template>
          <v-card>
            <v-card-text>
              <v-timeline align-top>
                <v-timeline-item
                  v-for="(item, i) in items"
                  :key="i"
                  :color="item.color"
                  :icon="item.icon"
                  fill-dot
                  small
                >
                  <v-card
                    :color="item.color"
                    dark
                  >
                    <v-card-title class="title">{{item.name}}</v-card-title>
                    <v-card-text class="white text--primary">
                      <p class="qText">{{item.text}}</p>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'Fqa',
  data () {
    return {
      items: [
        {
          name: 'Found Items ?',
          color: '#fe7250',
          icon: 'fal fa-camera-retro',
          text: 'Found items?, just take a picture of the item and post it on our warehouse with some notes'
        },
        {
          name: 'Looking for Lost Items ? ',
          color: '#79e0e7',
          icon: 'fal fa-file-edit',
          text: ' Just search your items through the item name or roughly address where you lost them' +
            ' or click our Warehouse button on home page, see if your items are in our Lost&Found warehouse'
        }
      ],
      websiteDes: 'Our website is mainly used to be an electronic Lost&Found warehouse, ' +
        'people can post lost items they found. All found items are stored at our Lost&Found warehouse.'
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-text
  font-family Montserrat
.active
  color #00b0ff
.qText
  font-family Montserrat
</style>
