<template>
  <div class="root" ref="container">
    <h2>Venues Info</h2>
    <br>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br>
    <v-data-table
      :headers="headers"
      :items="venues"
      :search="search"
      class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.desc }}</td>
          <td class="text-xs-left">{{ props.item.capacity }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.city }}</td>
          <td class="text-xs-left">{{ props.item.country }}</td>
          <td class="text-xs-left">{{ props.item.shows }}</td>
          <td class="text-xs-left">{{ props.item.tags }}</td>
          <td class="text-xs-left">
              <v-icon
                small
                class="mr-2"
                @click="editVenue(props.item.id)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteVenue(props.item.id)"
              >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table> 
    </div>
</template>
<script>
import editVenue from '@/components/administratorView/Venues/editVenue.vue'
import Vue from 'vue'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

export default {
  data: function(){
    return{
      headers: [
       { text: 'Name', value: 'name'},
       { text: 'Description', value: 'desc'},
       { text: 'Capacity', value: 'capacity'},
       { text: 'Address', value: 'address'},
       { text: 'City', value: 'city'},
       { text: 'Country', value: 'country'}, 
       { text: 'Shows', value: 'shows'},
       { text: 'Tags', value: 'tags'},
       { text: 'Delete From DB'}
      ],
      venues: [],
      search: ''
    }
  },
  components: {
    editVenue
  },
  methods: {
    deleteVenue: function(id){
          firebase.firestore.collection("venues").doc(id).delete().then(()=>{
            this.getVenuesFromDB()
            alert("Deleted Document Successfully")
          }).catch(function(error){
            alert(error)
          })
    },
    getVenuesFromDB: function(){
      let venuesFromDB=[]
      firebase.firestore.collection("venues").get().then(function(querySnapshot){
            querySnapshot.forEach( function(doc) {
              let currentVenue = {
                  id: doc.id,
                  name: doc.data().name,
                  desc: doc.data().desc,
                  capacity: doc.data().capacity,
                  address: doc.data().address,
                  city: doc.data().city,
                  country: doc.data().country,
                  shows: doc.data().shows,
                  tags: doc.data().tags
                }
                venuesFromDB.push(currentVenue)
                // statements
            })
          }).catch(function(error){
            console.error(error)
          })
        this.venues = venuesFromDB
    },
    editVenue: function(venueid){
       var ComponentClass = Vue.extend(editVenue)
        var instance = new ComponentClass({
          propsData: {
            id: venueid
          }
        })
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    }
  },
  mounted(){
    this.getVenuesFromDB()
  }
}
</script>
<style scoped>
</style>
