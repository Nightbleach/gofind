<template>
<v-container>
<!-- main home page start -->
  <v-layout align-center justify-center row>
    <v-flex>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">
            <v-container text-xs-center class="home-btn">
              <v-layout justify-center row fill-height wrap>
                <v-flex xs12>
                  <v-btn
                    flat
                    round
                    class="text-capitalize btn-grad white--text yellow amber lighten-1 font-weight-black title "
                    v-on="on"
                  >Wow, You  found it !
                    <v-icon class="upload-icon ml-4" small right>fa fa-cloud-upload-alt</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-img :src="imageBanner"></v-img>
                </v-flex>
              </v-layout>
            </v-container>
          </template>
<!--         main home page end -->
<!--       start user form (second toolbar start)  -->
          <v-card>
            <v-toolbar dark flat class="amber lighten-1">
              <v-btn icon dark @click="dialog = false">
                <v-icon>far fa-times-circle</v-icon>
              </v-btn>
              <v-toolbar-title>3 steps that you can help others to find their stuff</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click="dialog = false" class="text-capitalize subheading upload-text" >Upload</v-btn>
              </v-toolbar-items>
            </v-toolbar>
<!--         second toolbar end   -->
            <v-container text-xs-left class="ml-0">
              <form action="">
                <v-layout row justify-start wrap>
                 <v-flex xs12 class="form-text-font">
                  <p class="subheading form-text-heading">What types of stuff you found ?</p>
                   <v-combobox
                     flat
                     clearable
                     color="success"
                     v-model="select"
                     :items="itemsCategory"
                     label="Is that a wallet or anything else"
                     :rules="[ rules.required]"
                   >
                   </v-combobox>
                 </v-flex>
                 <v-flex xs12 class="form-text-font">
                   <p class="subheading form-text-heading" style="display: inline">What does stuff look like ?</p>
                   <v-btn
                     small
                     raised
                     round
                     flat
                     class="amber lighten-2 text-capitalize white--text ml-4"
                     @click="onPickFile"
                   >Upload Image</v-btn>
                   <input type="file"
                          style="display: none"
                          ref="fileInput"
                          accept="image/*"
                          @change="onFilePicked"
                   >
                 </v-flex>
                  <v-flex>
                    <img :src="imageUrl" height="150" alt="">
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
            <v-divider></v-divider>

<!--            <v-list two-line subheader>-->
<!--              <v-subheader>General</v-subheader>-->
<!--              <v-list-tile avatar>-->
<!--                <v-list-tile-action>-->
<!--                  <v-checkbox v-model="notifications"></v-checkbox>-->
<!--                </v-list-tile-action>-->
<!--                <v-list-tile-content>-->
<!--                  <v-list-tile-title>Notifications</v-list-tile-title>-->
<!--                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>-->
<!--                </v-list-tile-content>-->
<!--              </v-list-tile>-->
<!--              <v-list-tile avatar>-->
<!--                <v-list-tile-action>-->
<!--                  <v-checkbox v-model="sound"></v-checkbox>-->
<!--                </v-list-tile-action>-->
<!--                <v-list-tile-content>-->
<!--                  <v-list-tile-title>Sound</v-list-tile-title>-->
<!--                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>-->
<!--                </v-list-tile-content>-->
<!--              </v-list-tile>-->
<!--              <v-list-tile avatar>-->
<!--                <v-list-tile-action>-->
<!--                  <v-checkbox v-model="widgets"></v-checkbox>-->
<!--                </v-list-tile-action>-->
<!--                <v-list-tile-content>-->
<!--                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>-->
<!--                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>-->
<!--                </v-list-tile-content>-->
<!--              </v-list-tile>-->
<!--            </v-list>-->
          </v-card>
        </v-dialog>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      imageUrl: '',
      image: null,
      dialog: false,
      notifications: false,
      imageBanner: require('@/assets/img/home-ban.png'),
      // set item category combobox
      select: 'Wallet',
      itemsCategory: [
        'Book',
        'Cellphone',
        'Drive License',
        'Iphone',
        'Id card',
        'Laptop',
        'Purse',
        'Student Id card',
        'Wallet'
      ],
      // end
      // set input rules
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please pick a valid image format!')
      }
      // use fileReade read files that users typed
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style lang="stylus" scoped>@import '../stylus/main.styl'
.form-text-heading
  color #424242
.home-btn
  margin-top 11rem
  .btn-grad
    font-family Montserrat
    width:40%
    word-spacing 0.25rem
  //.btn-grad:hover
  +for_breakpoint(desktop)
    .btn-grad
      width:50%
  +for_breakpoint(tablet)
    .btn-grad
      width 65%
  +for_breakpoint(mobile)
    .btn-grad
      width 86%
  +for_breakpoint(tinymobile)
    .btn-grad
      width 100%
  .upload-text
    font-family "Helvetica Neue"
  .form-text-font
    font-family "Adobe Caslon Pro"

</style>
