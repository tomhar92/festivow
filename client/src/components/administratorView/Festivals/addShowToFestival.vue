<template>
	<v-form class="addForm">
		<h4>Add A New Show</h4>
		<v-menu
        	ref="dateMenu"
        	:close-on-content-click="false"
        	:nudge-right="40"
        	:return-value.sync="date"
        	lazy
        	transition="scale-transition"
        	offset-y
        	full-width
        	v-bind="dateMenu"
        	min-width="290px">
        	<v-text-field
          		slot="activator"
          		v-model="date"
          		label="Date"
          		prepend-icon="event"
          		readonly>
          	</v-text-field>
          	<v-date-picker
				v-model="date"
				label="Date"
				color="primary"
				reactive
				@input="$refs.dateMenu.save(date)">
			</v-date-picker>
        </v-menu>
       	<p class="manualError" v-if="dateErrors.length">
        	{{dateErrors[0]}}
        </p>	
		<v-menu
        	ref="startTimeMenu"
        	:close-on-content-click="false"
        	v-model="startTimeMenu"
        	:nudge-right="40"
        	:return-value.sync="startTime"
        	lazy
        	transition="scale-transition"
        	offset-y
        	full-width
        	max-width="290px"
        	min-width="290px">
        	<v-text-field
          		slot="activator"
          		v-model="startTime"
          		label="Start Time"
          		prepend-icon="access_time"
          		readonly
        	></v-text-field>
        	<v-time-picker
          		v-if="startTimeMenu"
          		v-model="startTime"
          		color="primary"
          		@change="$refs.startTimeMenu.save(startTime)"
        	></v-time-picker>
      	</v-menu>
      	<v-menu
        	ref="endTimeMenu"
        	:close-on-content-click="false"
        	v-model="endTimeMenu"
        	:nudge-right="40"
        	:return-value.sync="endTime"
        	lazy
        	transition="scale-transition"
        	offset-y
        	full-width
        	max-width="290px"
        	min-width="290px">
        	<v-text-field
          		slot="activator"
          		v-model="endTime"
          		label="End Time"
          		prepend-icon="access_time"
          		readonly
        	></v-text-field>
        	<v-time-picker
          		v-if="endTimeMenu"
          		v-model="endTime"
          		color="primary"
          		@change="$refs.endTimeMenu.save(endTime)"
        	></v-time-picker>
      	</v-menu>
      	<v-combobox
			v-model="artist"
			label="Artist"
			:items="artistsForCombobox"
			:error-messages="artistErrors"
			@touch="$v.artist.$touch()"
			@blur="$v.artist.$touch()">
		</v-combobox>
        <v-btn color="primary" @click="submit">
            Add Show
        </v-btn>
    </v-form>
</template>
<script>
import {required} from 'vuelidate/lib/validators'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

export default{
	data: function(){
		return{
			id: '',
			artist: null,
			artists: [],
			artistFound: true,
			date: null,
			startTime: null,
			endTime: null,
			dateMenu: false,
			startTimeMenu: false,
			endTimeMenu: false
		}
	},
	props: {
		stageId: String
	},
	created: function(){
		this.getArtistsFromDB()
		console.log("stageId:" ,this.stageId)
	},
	validations: {
		artist: {
			required
		},
		date: {
			required
		},
		startTime: {
			required
		},
		endTime: {
			required
		}
	},
	computed: {
			artistsForCombobox: function(){
			let artistNames = []
			this.artists.forEach(function(artist){
				artistNames.push(artist.name)
			})
			return artistNames
		},
		artistErrors(){
			let errors=[]
			if(!this.$v.artist.$dirty)
				return errors
			if(!this.$v.artist.required)
				errors.push('Artist is required.')
			if(!this.artistFound)
				errors.push('Can`t find artist in DB')
			return errors
		},	
		dateErrors(){
			let errors=[]
			if(!this.$v.date.$dirty)
				return errors
			if(!this.$v.date.required)
				errors.push('Date is required.')
			return errors
		},
		startTimeErrors(){
			let errors=[]
			if(!this.$v.startTime.$dirty)
				return errors
			if(!this.$v.startTime.required)
				errors.push('Start Time is required.')
			return errors
		},
		endTimeErrors(){
			let errors=[]
			if(!this.$v.endTime.$dirty)
				return errors
			if(!this.$v.endTime.required)
				errors.push('End Time is required.')
			return errors
		}
	},
	methods: {
		getArtistsFromDB: function(){
			let artistsFromDB=[]
			firebase.firestore.collection("artists").get().then(function(querySnaphot){
				querySnaphot.forEach(function(doc){
					let currentArtist = {
						id: doc.id,
						name: doc.data().name
					}
					artistsFromDB.push(currentArtist)
				})
			}).catch(function(error){
				console.error(error)
			})
			this.artists = artistsFromDB
		},
		submit: function(){
			this.$v.$touch()
			let artistID = this.getArtistId()
			if(!this.$v.$invalid && this.artistFound){
				let show= {
					id: this.stageId+'-'+artistID+'-'+this.startTime,
					artist: this.artist,
					date: this.date,
					startTime: this.startTime,
					endTime: this.endTime
				}
				let docRef = firebase.firestore.collection("stages").doc(this.stageId)
				docRef.update({
					shows: fb.firestore.FieldValue.arrayUnion(show)
				}).then(()=>{
					alert("Show Added Successfully!")
				}).catch((error)=>{
					console.error(error)
				})
			}
		},
		getArtistId: function(){
			this.artistFound = false
			let ArtistFromForm = this.artist
			let IDToReturn = "I've Got Nothing"
			this.artists.forEach((artist) => {
				if(artist.name === ArtistFromForm){
					IDToReturn = artist.id
					this.artistFound = true
				}
			})
			return IDToReturn
		}
	}
}
</script>
<style>
.addForm{
	overflow: hidden;
	height: auto;
}
</style>