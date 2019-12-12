<template>
<div ref="open">	
	<v-dialog v-model="editFestival" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Festival - {{name}}</h2>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="name"
					label="Name"
					:error-messages="nameErrors"
					@touch="$v.name.$touch()"
					@blur="$v.name.$touch()"
				/>
				<v-textarea
					v-model="desc"
					label="Description"
					box
					:error-messages="descErrors"
					@touch="$v.desc.$touch()"
					@blur="$v.desc.$touch()"
				/>
				<v-combobox
					v-model="selectedVenueForCombobox"
					label="Venue"
					:items="venuesForCombobox"
					:error-messages="venueErrors"
					@touch="$v.venue.$touch()"
					@blur="$v.venue.$touch()">
				</v-combobox>
				<v-menu
        			ref="startMenu"
        			:close-on-content-click="false"
        			:nudge-right="40"
        			:return-value.sync="startDate"
        			lazy
        			transition="scale-transition"
        			offset-y
        			full-width
        			v-bind="startMenu"
        			min-width="290px"
        			:error-messages="startDateErrors"
					@touch="$v.startDate.$touch()"
					@blur="$v.startDate.$touch()">
        			<v-text-field
          				slot="activator"
          				v-model="startDate"
          				label="Start Date"
          				prepend-icon="event"
          				readonly>
          			</v-text-field>
          			<v-date-picker
						v-model="startDate"
						label="Start Date"
						color="primary"
						reactive
						@input="$refs.startMenu.save(startDate)">
					</v-date-picker>
				</v-menu>
				<p class="manualError" v-if="startDateErrors.length">
        			{{startDateErrors[0]}}
        		</p>
        		<v-menu
					ref="endMenu"
					:close-on-content-click="false"
        			:nudge-right="40"
        			:return-value.sync="endDate"
        			lazy
        			transition="scale-transition"
        			offset-y
        			full-width
        			v-bind="endMenu"
        			min-width="290px"
        			:error-messages="endDateErrors"
					@touch="$v.endDate.$touch()"
					@blur="$v.endDate.$touch()">
					<v-text-field
          				slot="activator"
          				v-model="endDate"
          				label="End Date"
          				prepend-icon="event"
          				readonly>
          			</v-text-field>	
					<v-date-picker
						v-model="endDate"
						label="End Date"
						color="primary"
						reactive
						:error-messages="endDateErrors"
						@touch="$v.endDate.$touch()"
						@bind="$v.endDate.$touch()"
						@input="$refs.endMenu.save(endDate)">
					</v-date-picker>
				</v-menu>
				<p class="manualError" v-if="endDateErrors.length">
        			{{endDateErrors[0]}}
        		</p>
        		<v-flex xs12 d-flex align-center>
        			<v-label>Ticket Price</v-label>
        			<v-flex shrink style="width: 40px">
        				<v-text-field
					    	v-model="price[0]"
					    	class="mt-0"
          					hide-details
          					single-line
                        	type="number"
                    	></v-text-field>
                	</v-flex>
                	<v-flex style="padding: 10px; width: 75%">    
						<v-range-slider
							v-model="price"
							:max="10000"
							:min="0"
							:step="1">
						</v-range-slider>
					</v-flex>
					<v-flex shrink style="width: 40px">
						<v-text-field
					    	v-model="price[1]"
					    	class="mt-0"
          					hide-details
          					single-line
                        	type="number"
                    	></v-text-field>
					</v-flex>
				</v-flex>
				<v-combobox
            		v-model="selectedGenresForCombobox"
            		label="Genres"
            		:items="genresForCombobox"
            		:error-messages="genresErrors"
					@touch="$v.selectedGenres.$touch()"
					@blur="$v.selectedGenres.$touch()"
            		multiple>
            	</v-combobox>		
				<v-text-field
					v-model="img"
					label="Image URL"
					type="url"
					:error-messages="imgErrors"
					@touch="$v.img.$touch()"
					@blur="$v.img.$touch()">
				</v-text-field>
				<v-text-field
					v-model="video"
					label="Video URL"
					type="url"
					:error-messages="videoErrors"
					@touch="$v.video.$touch()"
					@blur="$v.video.$touch()">
				</v-text-field>
				<v-combobox
            		v-model="selectedArtistsForCombobox"
            		label="Artists"
            		:items="artistsForCombobox"
            		multiple>
            	</v-combobox>
            	<v-text-field
					v-model="tagField"
					label="Tags"
					:error-messages="tagFieldErrors"
					@touch="$v.tagField.$touch()"
					@blur="$v.tagField.$touch()"
					hint="Split values by commas">
				</v-text-field>
            	<v-flex>
            		<v-btn color="primary" @click="openStages">
            			Edit Stages
            		</v-btn>
            	</v-flex>
            	<br>
            	<v-divider></v-divider>		
				<br>
				<v-btn
					color="primary"
					@click="submit">
					Submit
				</v-btn>
				<v-btn
					color="primary"
					@click="closeFestival">
					Close
				</v-btn>	
			</v-card-text>	
		</v-card>	
	</v-dialog>
</div>	
</template>
<script>
import { required, url } from 'vuelidate/lib/validators'
import * as fb from 'firebase'
import Vue from 'vue'
import editStages from '@/components/administratorView/Festivals/editStages'
const firebase = require('../../../firebaseConfig.js')

export default{
	data: function(){
		return {
			name: '',
			desc: '',
			venue: null,
			previousVenue: null,
			venueChange: false,
			startDate: null,
			endDate: null,
			price: [],
			img: null,
			video: null,
			startMenu: false,
			endMenu: false,
			venues: [],
			artists: [],
			selectedArtists: [],
			previousArtists: [],
			artistsChange: false,
			selectedGenres: [],
			previousGenres: [],
			genres: [],
			genresChange: false,
			editFestival: true,
			editStages: false,
			tags: [],
			tagField: ''
		}
	},
	props: {
		id: String
	},
	components: {
		editStages
	},
	created: function(){
		let docRef = firebase.firestore.collection("festivals").doc(this.id)
		docRef.get().then((doc) => {
			if(doc.exists){
				this.name=doc.data().name
				this.desc=doc.data().desc
				this.venue=doc.data().venue
				this.startDate=doc.data().startDate
				this.endDate=doc.data().endDate
				this.price=doc.data().price
				this.selectedGenres=this.getGenresOfFestivalFromDB(doc.id)
				this.previousGenres = this.selectedGenres
				this.previousArtists = this.selectedArtists
				this.img=doc.data().img
				this.video=doc.data().video
				this.selectedArtists=doc.data().artists
				this.tagField=this.createTagField(doc.data().tags)
			}
			else{
				console.error("Doc doesn't exist!")
			}
		}).catch(function(error){
			console.error(error)
		})
		this.getVenuesFromDB()
		this.getArtistsFromDB()
		this.getGenresFromDB()
	},
	validations: {
		name: {
			required
		},
		desc: {
			required
		},
		venue: {
			required
		},
		startDate: {
			required
		},
		endDate: {
			required
		},
		price: {
			required
		},
		selectedGenres: {
			required
		},
		img: {
			url
		},
		video: {
			url
		},
		tagField: {
			required
		}
	},
	computed: {
		venuesForCombobox: function(){
			let venueNames = []
			this.venues.forEach(function(venue){
				venueNames.push(venue.name)
			})
			return venueNames
		},
		selectedVenueForCombobox: {
			get: function(){
				let venueName = null
				this.venues.forEach((venue) => {
					if(this.venue === venue.id)
						venueName = venue.name
				})
				return venueName
			},
			set: function(newValue){
				this.venues.forEach((venue)=>{
					if(newValue===venue.name){
						this.previousVenue = this.venue
						this.venue = newValue
						this.venueChange=true
					}
				})
				if(newValue === null){
					this.previousVenue = this.venue
					this.venue = null
				}
			}
		},
		artistsForCombobox: function(){
			let artistNames = []
			this.artists.forEach(function(artist){
				artistNames.push(artist.name)
			})
			return artistNames
		},
		selectedArtistsForCombobox:{
			get: function(){
				let artistNames = []
				if(this.selectedArtists){
					this.selectedArtists.forEach(function(artist){
						let docRef = firebase.firestore.collection("artists").doc(artist)
						docRef.get().then(function(doc){
							if(doc.exists)
								artistNames.push(doc.data().name)
							else
								console.error("Doc doesn't exist!")
						}).catch(function(error){
							console.error(error)
						})
					})
				}
				return artistNames
			},
			set: function(newValue){
				let selectedArtistsFromCombobox = []
				newValue.forEach((selectedArtist)=>{
					this.artists.forEach(function(artist){
						if (artist.name === selectedArtist)
							selectedArtistsFromCombobox.push(artist.id)
					})
				})
				this.selectedArtists = selectedArtistsFromCombobox
				this.artistsChange = true
			}
		},
		genresForCombobox: function(){
			let genreNames = []
			this.genres.forEach(function(genre){
				genreNames.push(genre.name)
			})
			return genreNames
		},
		selectedGenresForCombobox:{
			get: function(){
				let genreNames = []
				this.selectedGenres.forEach(function(genre){
					let docRef = firebase.firestore.collection("genres").doc(genre)
					docRef.get().then(function(doc){
						if(doc.exists)
							genreNames.push(doc.data().name)
						else
							console.error("Doc doesn't exist!")
					}).catch(function(error){
						console.error(error)
					})
				})
				return genreNames
			},
			set: function(newValue){
				let selectedGenresFromCombo = []
				newValue.forEach((selectedGenre)=>{
					this.genres.forEach(function(genre){
						if (genre.name === selectedGenre){
							selectedGenresFromCombo.push(genre.id)
						}	
					})
				})
				this.selectedGenres = selectedGenresFromCombo
				this.genresChange = true
			}	
		},	
		nameErrors(){
			let errors=[]
			if(!this.$v.name.$dirty)
				return errors
			if(!this.$v.name.required)
				errors.push('Name is required.')
			return errors
		},
		descErrors(){
			let errors=[]
			if(!this.$v.desc.$dirty)
				return errors
			if(!this.$v.desc.required)
				errors.push('Description is required.')
			return errors
		},
		venueErrors(){
			let errors=[]
			if(!this.$v.venue.$dirty)
				return errors
			if(!this.$v.venue.required)
				errors.push('Venue is required.')
			return errors
		},
		startDateErrors(){
			let errors=[]
			if(!this.$v.startDate.$dirty)
				return errors
			if(!this.$v.startDate.required)
				errors.push('Start Date is required.')
			if(!this.laterThan(this.startDate,this.endDate))
				errors.push('End date must be later than start date')
			return errors
		},
		endDateErrors(){
			let errors=[]
			if(!this.$v.endDate.$dirty)
				return errors
			if(!this.$v.endDate.required)
				errors.push('End date is required.')
			if(!this.laterThan(this.startDate,this.endDate))
				errors.push('End date must be later than start date')
			return errors
		},
		genresErrors(){
			let errors = []
			if(!this.$v.selectedGenres.$dirty)
				return errors
			if(!this.$v.selectedGenres.required)
				errors.push('You must select at least one genre')
			return errors
		},
		imgErrors(){
			let errors=[]
			if(!this.$v.img.$dirty)
				return errors
			if(!this.$v.img.url)
				errors.push('Img URL must be in url format')
			return errors
		},
		videoErrors(){
			let errors=[]
			if(!this.$v.video.$dirty)
				return errors
			if(!this.$v.video.url)
				errors.push('Video URL must be in url format')
			return errors
		},
		tagFieldErrors(){
			let errors=[]
			if(!this.$v.tagField.$dirty)
				return errors
			if(!this.$v.tagField.required)
				errors.push('You won`t be able to find this object!')
			return errors
		}
	},
	methods: {
		getVenuesFromDB: function(){
			let venuesFromDB=[]
			firebase.firestore.collection("venues").get().then(function(querySnaphot){
				querySnaphot.forEach(function(doc){
					let currentVenue = {
						id: doc.id,
						name: doc.data().name
					}
					venuesFromDB.push(currentVenue)
				})
			}).catch(function(error){
				console.error(error)
			})
			this.venues = venuesFromDB
		},
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
		laterThan: function(start, end){
			if(Date.parse(start) <= Date.parse(end))
   				return true
			return false
		},
		submit: function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let festival = {
					id: this.id,
					name: this.name,
					desc: this.desc,
					venue: this.venue,
					startDate: this.startDate,
					endDate: this.endDate,
					price: this.price,
					img: this.img,
					video: this.video,
					artists: this.selectedArtists,
					tags: this.splitToTags(this.tagField)
				}
				firebase.firestore.collection("festivals").doc(festival.id).set(festival)
				.then(()=>{	
					this.deleteFestivalFromPrevious()
					this.addFestivalToSelected()
					alert('Festival Successfully Edited!')
					this.editFestival = false
				}).catch(function(error){
					console.error(error)
				})
			}
			else{
				alert("Form is not valid!")
			}
		},
		closeFestival: function(){
			this.editFestival = false
		},
		openStages: function(){
			var ComponentClass = Vue.extend(editStages)
        	var instance = new ComponentClass({
          		propsData: {
           			id: this.id
          		}
        	})
        	instance.$mount()
        	this.$refs.open.appendChild(instance.$el)
		},
		closeStages: function(){
			this.editStages = false
		},
		deleteFestivalFromPrevious: function(){
			if(this.artistsChange){
				this.previousArtists.forEach((artist) => {
					let docRef = firebase.firestore.collection("artists").doc(artist)
					docRef.update({
						shows: fb.firestore.FieldValue.arrayRemove(this.id)
					})
				})
			}
			if(this.venueChange){
				let venueRef = firebase.firestore.collection("venues").doc(this.previousVenue)
				venueRef.update({
					shows: fb.firestore.FieldValue.arrayRemove(this.id)
				})
			}
			if(this.genresChange){
				this.previousGenres.forEach((genre) => {
					let docRef = firebase.firestore.collection("genres").doc(genre)
					docRef.update({
						festivals: fb.firestore.FieldValue.arrayRemove(this.id)
					})
				})
			}
		},
		addFestivalToSelected: function(){
			if(this.artistsChange){
				this.selectedArtists.forEach((artist) => {
				let docRef = firebase.firestore.collection("artists").doc(artist)
				docRef.update({
						shows: fb.firestore.FieldValue.arrayUnion(this.id)
				})
				})
			}
			if(this.venueChange){	
				let venueRef = firebase.firestore.collection("venues").doc(this.venue)
				venueRef.update({
					shows: fb.firestore.FieldValue.arrayUnion(this.id)
				})
			}
			if(this.genresChange){
				this.selectedGenres.forEach((genre) => {
					let docRef = firebase.firestore.collection("genres").doc(genre)
					docRef.update({
						festivals: fb.firestore.FieldValue.arrayUnion(this.id)
					})
				})
			}
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
		},
		getGenresFromDB: function(){
			let genresFromDB=[]
			firebase.firestore.collection("genres").get().then(function(querySnaphot){
				querySnaphot.forEach(function(doc){
					let currentGenre = {
						id: doc.id,
						name: doc.data().name
					}
					genresFromDB.push(currentGenre)
				})
			}).catch(function(error){
				console.error(error)
			})
			this.genres = genresFromDB
		},
		createTagField: function(tagsArray){
			return tagsArray.join()
		},
		splitToTags: function(){
			console.log(this.tagField.split(","))
			return this.tagField.split(",")
		}
	}
} 
</script>
<style scoped>
</style>	