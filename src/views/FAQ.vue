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
            <div class="question-text">What is our website used for ?</div>
          </template>
          <v-card>
            <v-card-text>Our website is used for ....</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="question-text">How to use our app ?</div>
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
                      <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="question-text">Questions3</div>
          </template>
          <v-card>
            <v-card-text>blah blah blah....</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="question-text">Questions4</div>
          </template>
          <v-card>
            <v-card-text>blah blah blah....</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon>fal fa-plus</v-icon>
          </template>
          <template v-slot:header>
            <div class="question-text">Questions5</div>
          </template>
          <v-card>
            <v-card-text>blah blah blah....</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
<!--    Vue测验开始-->
    <v-card>
      <ul>
        <li
          v-for="(item, index) in movies"
          :key="item.id"
          :class="{active:currentIndex ===index}"
          @click="changeColor(index)"
        >{{item}}</li>
      </ul>
      <p :style="{fontSize: textSize,color:fontColor}">ThIS IS MY SHOW</p>
      <h1 v-for="book in books" :key="book.id" >
        Book's name{{book.name}}
        总共价格为： {{totalPrice}}
      </h1>
      <v-btn @click="addClick(123, $event)">showSomething</v-btn>
      <label> 用户账户
        <input type="text" @keyup.enter="typeEnter">
      </label>
      <hr>
      <label v-if="showItem"> 用户账户
        <input type="text" placeholder="用户账户" >
      </label>
      <label v-else> 邮箱账户
        <input type="text" placeholder="邮箱账户">
      </label>
      <v-btn @click="getShowItem">切换方式</v-btn>
      <hr>
      <ul>
        <li v-for="item in books" :key="item.id">
         {{item.price | showPrice}}
        </li>
      </ul>
    </v-card>
    <v-card>
      <ul>
        <li v-for="(book, index) in books" :key="book.id">
          <p> Name: {{book.name}}</p>
          <p> Price: {{book.price}}</p>
          <p>
            <v-btn small @click="decrement(index)" :disabled="book.quantity <=1">-</v-btn>
            Quantity: {{book.quantity}}
            <v-btn small @click="increment(index)">+</v-btn>
          </p>
        </li>
      </ul>
      <h1>Total price {{booksTotalPrice}}</h1>
    </v-card>
  <!--    Vue测验结束-->
  </v-container>
</template>

<script>
export default {
  name: 'Fqa',
  data () {
    return {
      items: [
        {
          name: 'Step 1',
          color: '#fe7250',
          icon: 'fal fa-camera-retro'
        },
        {
          name: 'Step 2',
          color: '#79e0e7',
          icon: 'fal fa-file-edit'
        },
        {
          name: 'Step 3',
          color: '#45d4de',
          icon: 'fal fa-file-upload'
        },
        {
          name: 'Step 4',
          color: '#f4cf50',
          icon: 'mdi-buffer'
        }
      ],
      // Vue测验开始-->
      showItem: true,
      movies: ['Kobe', 'Terry', 'James', 'Irving'],
      currentIndex: false,
      textSize: '30px',
      fontColor: 'green',
      books: [
        {name: 'TERRY', price: 143, quantity: 1},
        {name: 'kobe', price: 132, quantity: 1},
        {name: 'ted', price: 41, quantity: 1},
        {name: 'lucy', price: 190, quantity: 1}
      ]
    }
  },
  filters: {
    showPrice (price) {
      return price.toFixed(2)
    }
  },
  computed: {
    totalPrice () {
      let result = 0
      for (let i = 0; i < this.books.length; i++) {
        result += this.books[i].price
      }
      return result
    },
    booksTotalPrice () {
      // let result = 0
      // for (let i = 0; i < this.books.length; i++) {
      //   result += this.books[i].price * this.books[i].quantity
      // }
      // return result
      // 另外一种高阶的写法
      return this.books.reduce(function (pre, book) {
        return pre + book.price * book.quantity
      }, 0)
    }
  },
  methods: {
    changeColor (index) {
      this.currentIndex = index
    },
    addClick (abc, event) {
      console.log('这是点击事件')
      console.log(event)
    },
    typeEnter () {
      console.log('这是键盘 enter的监听事件')
    },
    getShowItem () {
      this.showItem = !this.showItem
    },
    increment (index) {
      this.books[index].quantity++
    },
    decrement (index) {
      this.books[index].quantity--
    }
  }
  // Vue测验结束-->
}
</script>

<style lang="stylus" scoped>
.question-text
  font-family Montserrat
    //Vue测验开始-->
.active
  color #00b0ff
//Vue测验结束-->
</style>
