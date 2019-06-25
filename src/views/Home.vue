<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                    <v-icon class="upload-icon ml-4" regular right>fal fa-cloud-upload</v-icon>
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
                <v-btn type="submit" form ="warehouseItemUpload" dark flat :disabled="!formIsValid"  class="text-capitalize subheading upload-text" >Upload</v-btn>
              </v-toolbar-items>
            </v-toolbar>
<!--         second toolbar end   -->
            <v-container text-xs-left class="ml-0">
              <form ref="form" @submit.prevent="onCreateWarehouseItem" id="warehouseItemUpload">
                <v-layout row justify-start wrap>
                 <v-flex xs12 class="form-text-font">
                  <p class="subheading form-text-heading">
                    <v-icon class="mr-1" color="#40C4FF">fal fa-layer-group</v-icon>
                    What types of stuff you found ?
                  </p>
                   <v-combobox
                     name="category"
                     id="category"
                     flat
                     clearable
                     clear-icon="fal fa-times-circle"
                     color="success"
                     v-model="category"
                     :items="itemsCategory"
                     label="Is that a wallet or anything else"
                     :rules="[rules.required]"
                     placeholder="Wallet?"
                   >
                   </v-combobox>
                 </v-flex>
                 <v-flex xs12 class="form-text-font">
                   <p class="subheading form-text-heading" style="display: inline">
                     <v-icon class="mr-1" color="#40C4FF">fal fa-image</v-icon>
                     What does stuff look like ?
                   </p>
                   <v-btn
                     small
                     raised
                     round
                     flat
                     class="amber lighten-2 text-capitalize white--text ml-4"
                     @click="onPickFile"
                     style="cursor: pointer"
                   >Add/Replace Image</v-btn>
                   <input
                     type="file"
                     style="display: none"
                     ref="fileInput"
                     accept="image/*"
                     @change="onFilePicked"
                   >
                 </v-flex>
                  <v-flex>
                    <v-card max-width="450" class="text-xs-center">
                        <img
                          style="vertical-align: middle"
                          :src ="imageUrl"
                          height="250"
                          id="imageUrl"
                          alt="">
                    </v-card>
                  </v-flex>
                </v-layout>
<!--                set a divider-->
                <v-divider class="my-4"></v-divider>
<!--                set found location-->
                <v-layout row justify-start wrap>
                  <v-flex xs12 class="form-text-font">
                   <p class="subheading form-text-heading">
                     <v-icon class="mr-1" color="#40C4FF">fal fa-location</v-icon>
                     Please tell us the approximate location or places , that helps owners to remind where they lost their stuffs</p>
<!--                    TEST-->
                    <v-text-field
                    v-model="foundAt"
                    name="foundAt"
                    id="foundAt"
                    :item="cityoption">

                    </v-text-field>

<!--                    TEST END-->

<!--                    <v-combobox-->
<!--                      id="foundAt"-->
<!--                      name="foundAt"-->
<!--                      v-model="foundAt"-->
<!--                      :items="dunedinDistrict"-->
<!--                      :key="dunedinDistrict.key"-->
<!--                      :search-input.sync="search"-->
<!--                      hint="maximum of 2 regions or places"-->
<!--                      persistent-hint-->
<!--                      hide-selected-->
<!--                      label= "You found it at/in..."-->
<!--                      color="#B388FF"-->
<!--                      :rules="[rules.required]"-->
<!--                      prepend-inner-icon="fal fa-map-marker-check"-->
<!--                      clear-icon="fal fa-times-circle"-->
<!--                      clearable-->
<!--                      multiple-->
<!--                      small-chips-->
<!--                      deletable-chips-->
<!--                      ref="combobox"-->
<!--                      @change="toggleMenu"-->
<!--                      item-text="region"-->
<!--                      return-object-->
<!--                      required-->
<!--                    >-->

<!--                      <template v-slot:no-data>-->
<!--                        <v-list-tile>-->
<!--                          <v-list-tile-content>-->
<!--                            <v-list-tile-title>-->
<!--                              No places matching "<strong>{{ search }}</strong>".Press-->
<!--                              <kbd>enter</kbd> to create an one.-->
<!--                            </v-list-tile-title>-->
<!--                          </v-list-tile-content>-->
<!--                        </v-list-tile>-->
<!--                      </template>-->
<!--                    </v-combobox>-->
<!--                    set a divider-->
                    <v-divider class="my-5"></v-divider>
                    <p class="subheading form-text-heading">
                      <v-icon class="mr-1" color="#40C4FF">fal fa-clipboard</v-icon>
                      Please leave a note, which ways they can get their stuff back...
                    </p>
                    <v-textarea
                      name="note"
                      id="note"
                      v-model="note"
                      :counter="80"
                      :rules="noteRules"
                      required
                      color="#FFC107"
                      outline
                      flat
                      placeholder="Note might be your Phone Number/Email or pure note, Also you can bring the stuff to your nearest City Mini Market, We will put it into our LostFounds warehouse...  "
                    >
                    </v-textarea>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card>
        </v-dialog>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>import firebase from 'firebase'

export default {
  name: 'Home',
  data () {
    return {
      imageUrl: '',
      note: '',
      category: '',
      foundAt: '',
      citySelector: '',
      cityoption: ['abc', 'ted', 'sdf', 'Dunedin', 'otago center'],
      // set item category combobox
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
      dunedinDistrict: [ ],
      // end
      noteRules: [
        v => !!v || 'Note is required',
        v => (v && v.length <= 80) || 'Note must be less than 80 characters'
      ],
      image: null,
      dialog: false,
      notifications: false,
      imageBanner: require('@/assets/img/home-ban.png'),
      // set input rules
      rules: {
        required: value => !!value || 'Required.'
      },
      // set regions input selection
      search: null
    }
  },
  computed: {
    formIsValid () {
      return this.category !== '' && this.foundAt !== '' && this.note !== '' && this.imageUrl !== ''
    }
  },
  // watch: {
  //   // add watch to region selector
  //   foundAt (val) {
  //     if (val.length > 2) {
  //       this.$nextTick(() => this.foundAt.pop())
  //     }
  //   }
  // },
  methods: {
    // Set regions that can be closed once users had picked a region
    toggleMenu (val) {
      if (val.length) this.$refs['combobox'].blur()
    },
    // end
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
    },
    // Set method for uploading a new wareHouse item
    onCreateWarehouseItem () {
      console.log('12312')
      const warehouseItemData = {
        category: this.category,
        imageUrl: this.imageUrl,
        foundAt: this.foundAt,
        note: this.note,
        UploadDate: new Date()
      }
      this.$store.dispatch('createWarehouseItem', warehouseItemData)
      this.$router.push('/lostFoundsWarehouses')
    }
  },
  created () { // fetch Dunedin districts data from firebase
    let db = firebase.firestore()
    db.collection('dunedinDistrict').get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let dunedinRegions = doc.data()
          dunedinRegions.id = doc.id
          this.dunedinDistrict.push(dunedinRegions)
        })
      })
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
