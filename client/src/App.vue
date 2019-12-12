<template>
  <v-app id="app">
  	  <v-toolbar color="secondary">
      <v-toolbar-items>
        <v-btn flat @click="hello"><b class="toolbar">FESTIVOW</b></v-btn>
      </v-toolbar-items>  
			 <v-toolbar-items v-if="logged">
				<v-btn flat @click="profile"><b>Profile</b></v-btn>
        <v-btn flat @click="logout"><b>Log Out</b></v-btn>
        </v-toolbar-items>
			 <v-toolbar-items v-else>
				<v-btn flat @click="login">Login</v-btn flat>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="admin">
        <v-btn flat @click="administrator">Administrator View</v-btn>
      </v-toolbar-items>
      <div class="search_bar">
        <v-text-field
            v-model="searchvalue"
            label="Search"
            append-icon="search"
            v-on:keyup.enter="search"> 
        </v-text-field>
      </div>
  	  </v-toolbar>
      <router-view/>
  </v-app>
</template>

<script>
import router from '../src/router/index.js'
const firebase=require('@/firebaseConfig.js')

export default {
  name: 'App',
  data: function() {
    return {
      searchvalue: ''
    }
  },
  computed: {
  	logged: function(){
        if(!this.$store.state.user.currentUser){
        	return false
        }
        return true    	
  	},
    admin: function(){
      if(this.$store.state.user.currentUser)
        return this.$store.state.user.userProfile.admin      
      return false
    }
  },
  methods: {
  	hello: function(){
  		router.push({ path: `../hello` })
  	},
  	profile: function(){
  		router.push({ path: `../profile` })
  	},
  	login: function(){
  		router.push({ path: `../login` })
  	},
    logout: function(){
      firebase.auth.signOut().then(() => {
        this.$store.dispatch('user/logOutUser')
        this.$router.replace('hello')
      })
    },
    administrator: function(){
      router.push({ path: `../administrator` })
    },
    search: function(){
      this.$router.push({ path: `/search/${this.searchvalue}` })
    }
  }	
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.toolbar{
  font-color: white;
}

.search_bar{
  padding-top: 12px;
  width: 300px;
}
</style>
