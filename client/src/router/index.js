import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Administrator from '@/components/Administrator'
import userProfile from '@/components/userProfile'
import Genre from '@/components/Genre'
import Artist from '@/components/Artist'
import Search from '@/components/Search'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuelidate from 'vuelidate'
import store from '../store.js'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import AsyncComputed from 'vue-async-computed'
const firebase = require('../firebaseConfig.js')
import 'swiper/dist/css/swiper.css'

Vue.use(Router)

Vue.use(Vuetify, {
  theme: {
    primary: '#F06543',
    secondary: '#EFB851',
    accent: '#475D9B'
  }
})

Vue.use(KeenUI)

Vue.use(Vuelidate)

Vue.use(AsyncComputed)

let router =  new Router({
  routes: [
    {
      path: '*',
      redirect: '/hello'
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/profile',
      name: 'User Profile',
      component: userProfile,
      beforeEnter: (to, from, next) => {
        if(!store.state.user.currentUser){
          alert('Please Login First')
          next('login')
        }
        else
          next()  
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(store.state.user.currentUser != null){
          alert('You Are Already Logged In!')
          next('hello')
        }
        else
          next()
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        if(store.state.user.currentUser != null){
          alert('You Are Already Logged In!')
          next('hello')
        }
        else
          next()
      }
    },
    {
      path: '/administrator',
      name: 'Administrator',
      component: Administrator,
      beforeEnter: (to, from, next) => {
        if(!store.state.user.currentUser){
          alert('Youre Not Logged In')
          next('login')
        }
        else{
              if(store.state.user.userProfile.admin)
                next()
              else
                next('hello') 
        }
      }
    },
    {
     path: '/genre/:id',
     name: 'Genre',
     component: Genre 
    },
    {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/search/:value',
      name: 'Search',
      component: Search
    }
  ]  
})

export default router
