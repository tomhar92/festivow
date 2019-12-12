<template>
	<div class="root" ref="container">
		<h2>Slides Info</h2>
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
    		:items="slides"
        :search="search"
    		class="elevation-1">
  			<template slot="items" slot-scope="props">
      			<td class="text-xs-left">{{ props.item.id }}</td>
      			<td class="text-xs-left">{{ props.item.headline }}</td>
      			<td class="text-xs-left">{{ props.item.desc }}</td>
      			<td class="text-xs-left">{{ props.item.img }}</td>
            <td class="text-xs-left">{{ props.item.linkTo}}</td>
            <td class="text-xs-left">
              <v-icon
                small
                class="mr-2"
                @click="editSlide(props.item.id)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteSlide(props.item.id)"
              >
              delete
            </v-icon>
          </td>
    		</template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
    	</v-data-table>	
   	</div>
</template>
<script>
import Vue from 'vue'
import editSlide from '@/components/administratorView/Slides/editSlide.vue'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

export default {
	data: function(){
		return{
			headers: [
			{ text: 'ID', value: 'id'},
			{ text: 'Headline', value: 'headline'},
			{ text: 'Description', value: 'desc'},
			{ text: 'Image', value: 'img'},
      { text: 'Link', value: 'linkTo'},
      { text: 'Actions', sortable: 'false'}
			],
      slides: [],
      search: ''
		}
	},
  components: {
    editSlide
  },
	methods: {
    editSlide: function(slideid){
      var ComponentClass = Vue.extend(editSlide)
      var instance = new ComponentClass({
        propsData: {
          id: slideid
        }
      })
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    },
		deleteSlide: function(id){
      		firebase.firestore.collection("slides").doc(id).delete().then(()=>{
       			alert("Deleted Document Successfully")
            this.getSlidesFromDB()
      		}).catch(function(error){
        		alert(error)
      		})
		},
    getSlidesFromDB: function(){
      let slidesFromDB=[]
        firebase.firestore.collection("slides").get().then(function(querySnapshot){
            querySnapshot.forEach( function(doc) {
              let currentSlide = {
                  id: doc.id,
                  headline: doc.data().headline,
                  desc: doc.data().desc,
                  img: doc.data().img,
                  linkTo: doc.data().linkTo
                }
                slidesFromDB.push(currentSlide)
                // statements
            })
          }).catch(function(error){
            console.error(error)
          })
        this.slides = slidesFromDB
    }
	},
  mounted(){
    this.getSlidesFromDB()
  }
}
</script>
<style scoped>
</style>
