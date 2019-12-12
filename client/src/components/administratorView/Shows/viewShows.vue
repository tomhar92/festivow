<template>
	<div class="root" ref="container">
		<h2>Shows Info</h2>
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
    		:items="shows"
    		:search="search"
    		class="elevation-1">
  			<template slot="items" slot-scope="props">
      			<td class="text-xs-left">{{ props.item.artist }}</td>
      			<td class="text-xs-left">{{ props.item.venue }}</td>
      			<td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.time }}</td>
            <td class="text-xs-left">{{ props.item.price }}</td>
            <td class="text-xs-left">{{ props.item.img }}</td>
            <td class="text-xs-left">{{ props.item.video}}</td>
            <td class="text-xs-left">{{ props.item.reviews }}</td>
      			<td class="text-xs-left">
              <v-icon
                small
                class="mr-2"
                @click="editShow(props.item.id)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteShow(props.item.id)"
              >
                delete
              </v-icon>    
            </td>
    		</template>
    	</v-data-table>	
   	</div>
</template>
<script>
import Vue from 'vue'
import editShow from '@/components/administratorView/Shows/editShow.vue'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')


export default {
	data: function(){
		return{
			headers: [
			 { text: 'Artist', value: 'artist'},
			 { text: 'Venue', value: 'venue'},
			 { text: 'Date', value: 'date'},
       { text: 'Time', value: 'time'},
       { text: 'Price', value: 'price'},
       { text: 'Img', value: 'img'},
       { text: 'Video', value: 'video'},
       { text: 'Reviews', value: 'reviews'},
       { text: 'Delete From DB'}
			],
      shows: [],
      search: ''
		}
	},
  components: {
    editShow
  },
	methods: {
      deleteShow: function(id){
          let docRef = firebase.firestore.collection("shows").doc(id)
          docRef.get().then((doc) => {
            if(doc.exists){
              console.log("artist from doc:" ,doc.data().artist)
              this.deleteShowFromArtist(id, doc.data().artist)
              this.deleteShowFromVenue(id, doc.data().venue)
              docRef.delete().then(()=>{
                this.getShowsFromDB()
                alert("Deleted Document Successfully")
              }).catch(function(error){
                console.error(error)
              })
            }
            else{
              console.error("Doc doesn't exist")
            }  
          }).catch(function(error){
            console.error(error)
          })
      },
      editShow: function(showid){
        var ComponentClass = Vue.extend(editShow)
        var instance = new ComponentClass({
          propsData: {
            id: showid
          }
        })
        instance.$mount()
        this.$refs.container.appendChild(instance.$el)
      },
      getShowsFromDB: function(){
        let showsFromDB=[]
        firebase.firestore.collection("shows").get().then(function(querySnapshot){
            querySnapshot.forEach( function(doc) {
              let currentShow = {
                  id: doc.id,
                  artist: doc.data().artist,
                  venue: doc.data().venue,
                  date: doc.data().date,
                  time: doc.data().time,
                  price: doc.data().price,
                  img: doc.data().img,
                  video: doc.data().video,
                  reviews: doc.data().reviews
                }
                showsFromDB.push(currentShow)
                // statements
            })
          }).catch(function(error){
            console.error(error)
          })
        this.shows = showsFromDB
    },
    deleteShowFromArtist: function(showid, artistid){
      let docRef = firebase.firestore.collection("artists").doc(artistid)
      docRef.update({
          shows: fb.firestore.FieldValue.arrayRemove(showid)
        })
    },
    deleteShowFromVenue: function(showid, venueid){
      let docRef = firebase.firestore.collection("venues").doc(venueid)
      docRef.update({
          shows: fb.firestore.FieldValue.arrayRemove(showid)
        })
    }
  },
  mounted(){
    this.getShowsFromDB()
  }
}
</script>
<style scoped>
</style>