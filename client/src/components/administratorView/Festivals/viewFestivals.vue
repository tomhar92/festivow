<template>
	<div class="root" ref="container">
		<h2>Festivals Info</h2>
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
    	:items="festivals"
      :search="search"
      class="elevation-1">
  		<template slot="items" slot-scope="props">
      	<td class="text-xs-left">{{ props.item.name }}</td>
      	<td class="text-xs-left">{{ props.item.desc }}</td>
        <td calss="text-xs-left">{{ props.item.venue }}</td>
      	<td class="text-xs-left">{{ props.item.startDate }}</td>
        <td class="text-xs-left">{{ props.item.endDate }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-left">{{ props.item.artists }}</td>
        <td class="text-xs-left">{{ props.item.genres }}</td>
        <td class="text-xs-left">{{ props.item.stagesInFestival}}</td>
        <td class="text-xs-left">{{ props.item.reviews }}</td>
        <td class="text-xs-left">{{ props.item.tags }}</td>
      	<td class="text-xs-left">
          <v-icon
            small
            class="mr-2"
            @click="editFestival(props.item.id)"
            >edit
          </v-icon>
          <v-icon
            small
            @click="deleteFestival(props.item.id)"
            >delete
          </v-icon>
        </td>  
    		</template>
    	</v-data-table>	
   	</div>
</template>
<script>
const firebase = require('../../../firebaseConfig.js')
import Vue from 'vue'
import * as fb from 'firebase'
import editFestival from '@/components/administratorView/Festivals/editFestival.vue'

export default {
	data: function(){
		return{
			headers: [
			{ text: 'Name', value: 'name'},
			{ text: 'Description', value: 'desc'},
      { text: 'Venue', value: 'venue'},
			{ text: 'Start Date', value: 'startDate'},
      { text: 'End Date', value: 'endDate'},
      { text: 'Price', value: 'price'},
      { text: 'Artists', value: 'artists'},
      { text: 'Genres', value: 'genres'},
      { text: 'Stages', value: 'stagesInFestival'},
      { text: 'Reviews', value: 'reviews'},
      { text: 'Tags', value: 'tags'},
			{ text: 'Actions'}
			],
      festivals: [],
      search: ''
		}
	},
  components: {
    editFestival
  },
	methods: {
      deleteFestival: function(id){
        //Should Implement 'Remove Festival From Venue and Artists'
        let docRef=firebase.firestore.collection("festivals").doc(id)
        docRef.get().then((doc) => {
          this.deleteFestivalFromVenue(id, doc.data().venue)
          this.deleteFestivalFromArtists(id, doc.data().artists)
          this.deleteFestivalFromGenre(id)
          docRef.delete().then(()=>{
            this.getFestivalsFromDB()
            alert("Deleted Festival Successfully")
          }).catch(function(error){
            console.error(error)
          })
        })
      },
      editFestival: function(festivalid){
        var ComponentClass = Vue.extend(editFestival)
        var instance = new ComponentClass({
          propsData: {
            id: festivalid
          }
        })
        instance.$mount()
        this.$refs.container.appendChild(instance.$el)
      },
      getFestivalsFromDB: function(){
        let festivalsFromDB=[]
        firebase.firestore.collection("festivals").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let currentFestival = {
                  id: doc.id,
                  name: doc.data().name,
                  desc: doc.data().desc,
                  venue: doc.data().venue,
                  startDate: doc.data().startDate,
                  endDate: doc.data().endDate,
                  price: doc.data().price,
                  img: doc.data().img,
                  video: doc.data().video,
                  artists: doc.data().artists,
                  genres: this.getGenresOfFestivalFromDB(doc.id),
                  stagesInFestival: doc.data().stagesInFestival,
                  reviews: doc.data().reviews,
                  tags: doc.data().tags
                }
                festivalsFromDB.push(currentFestival)
                // statements
            })
          }).catch(function(error){
            console.error(error)
          })
        this.festivals = festivalsFromDB
    },
    deleteFestivalFromVenue: function(festivalid, venueid){
      let docRef = firebase.firestore.collection("venues").doc(venueid)
      docRef.update({
          shows: fb.firestore.FieldValue.arrayRemove(festivalid)
        })
    },
    deleteFestivalFromArtists: function(festivalid, artists){
      artists.forEach((artist) => {
        let docRef = firebase.firestore.collection("artists").doc(artist)
        docRef.update({
          shows: fb.firestore.FieldValue.arrayRemove(festivalid)
        })
      })
    },
    deleteFestivalFromGenre: function(festivalid){
      let col = firebase.firestore.collection("genres")
      let query = col.where('fesitvals', 'array-contains', festivalid)
      query.get().then(function(querySnapshot){
        querySnapshot.forEach((doc)=>{
          doc.update({
            festivals: fb.firestore.FieldValue.arrayRemove(festivalid)
          })
        })
      })
    },
    getGenresOfFestivalFromDB: function(festivalid){
      let genresFromDB = []
      let col = firebase.firestore.collection("genres")
      let query = col.where('festivals', 'array-contains', festivalid)
      query.get().then(function(querySnapshot){
        querySnapshot.forEach((doc)=>{
          genresFromDB.push(doc.id)
        })
      })
      return genresFromDB
    }
  },
  mounted(){
    this.getFestivalsFromDB()
  }
}
</script>
<style scoped>
</style>
