<template>
  
  <div class="profile" ref="container">
    <br>
    <v-layout justify-center>
        <div class="details" v-if="exists">
          <v-layout row align-center>
            <v-flex x4>
              <v-img class="img"
                aspect-ratio="1"
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                >
              </v-img>  
            </v-flex>
            <v-flex xs8>
              <v-layout row>
                  <h1>{{user.name}}</h1>
               </v-layout>
            </v-flex>
          </v-layout>
          <br>
          <v-layout row>
            <v-layout column>
              <v-flex row>
                <v-icon>email</v-icon>
              </v-flex>
              <br>
              <v-flex row>
                <v-icon>location_on</v-icon>
              </v-flex>  
            </v-layout>
            <v-layout column>
              <v-flex row justify-start align-center>
                <h3>{{user.email}}</h3>
              </v-flex>
              <br>
              <v-flex row justify-start align-center>
                <h3>{{user.city}}, {{user.country}}</h3>
              </v-flex>   
            </v-layout>
          </v-layout>     
          <br>
          <v-layout row justify-center>
            <v-btn color="primary" @click="openPasswordDialog">Change Password</v-btn>
            <v-btn color="primary" @click="openDeleteDialog">Delete User</v-btn>
          </v-layout>
        </div>
    </v-layout>       
  </div>
</template>

<script>
import Vue from 'vue'
import passwordDialog from '@/components/userManagement/changePasswordDialog.vue'
import deleteDialog from '@/components/userManagement/deleteUser.vue'
const firebase = require('../firebaseConfig.js')

export default {
  name: 'Administrator',
  computed: {
    exists: function(){
      if(!this.$store.state.user.currentUser)
        return false
      return true
    },
    user: function(){
      return this.$store.state.user.userProfile
    }
  },
  components: {
    passwordDialog,
    deleteDialog
  },
  methods: {
    openPasswordDialog: function(){
      var ComponentClass = Vue.extend(passwordDialog)
      var instance = new ComponentClass()
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    },
    openDeleteDialog: function(){
      var ComponentClass = Vue.extend(deleteDialog)
      var instance = new ComponentClass()
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    }
  }    
  }     
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2, h4{
  margin: 10px;
}

.img{
  border-radius: 50%;
}

</style>