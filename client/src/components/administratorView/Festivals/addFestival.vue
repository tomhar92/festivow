<template>
	<div class="addArtist">
		<h2>Add Festival</h2>
		<br>
		<v-layout>
			<v-container>
				<v-form>
					<v-text-field
						v-model="name"
						label="Name"
						:error-messages="nameErrors"
						@touch="$v.name.$touch()"
						@blur="$v.name.$touch()">
					</v-text-field>
					<v-textarea
						v-model="desc"
						label="Description"
						:error-messages="descErrors"
						@touch="$v.desc.$touch()"
						@blur="$v.desc.$touch()"
						box>
					</v-textarea>
					<v-combobox
						v-model="venue"
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
            			v-model="selectedGenres"
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
					<v-btn
						color="primary"
						@click="submit">Submit
					</v-btn>		
				</v-form>
			</v-container>
		</v-layout>
	</div>			
</template>
<script>
import { required, url } from 'vuelidate/lib/validators'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

function isGenreSelected(){
	if(!this.selectedGenres.length)
		return false
	return true
}

export default{
	data: function(){
		return {
			name: '',
			desc: '',
			venue: null,
			startDate: null,
			endDate: null,
			price: [],
			genres: [],
			selectedGenres: [],
			img: null,
			video: null,
			startMenu: false,
			endMenu: false,
			venues: []
		}
	},
	created: function(){
		this.getVenuesFromDB()
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
		selectedGenres: {
				isGenreSelected
		},
		img: {
			url
		},
		video: {
			url
		}
	},
	computed: {
		genresForCombobox: function(){
			let genreNames = []
			this.genres.forEach(function(genre){
				genreNames.push(genre.name)
			})
			return genreNames
		},
		venuesForCombobox: function(){
			let venueNames = []
			this.venues.forEach(function(venue){
				venueNames.push(venue.name)
			})
			return venueNames
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
			let errors=[]
			if(!this.$v.selectedGenres.$dirty)
				return errors
			if(!this.$v.selectedGenres.isGenreSelected){
				errors.push('You must pick at least one genre. ')
			}
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
		}
	},
	methods: {
		submit: function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let festival = {
					id: 'festival-'+Math.random().toString(36).substr(2, 16),
					name: this.name,
					desc: this.desc,
					venue: this.getVenueId(),
					startDate: this.startDate,
					endDate: this.endDate,
					price: this.price,
					img: this.img,
					video: this.video,
					artists: [],
					stagesInFestival: [],
					reviews: [],
					tags: this.createTags()
				}
				console.log(festival)
				firebase.firestore.collection("festivals").doc(festival.id).set(festival)
				.then(()=>{
					this.addFestivalToVenue(festival.id)
					this.updateSelectedGenres(festival.id)
					alert('Festival Successfully Added!')
				}).catch(function(error){
					console.error(error)
				})
			}
		},
		laterThan: function(start, end){
			if(Date.parse(start) <= Date.parse(end))
   				return true
			return false
		},
		getVenuesFromDB: function(){
			let venuesFromDB=[]
			firebase.firestore.collection("venues").get().then(function(querySnapshot){
        		querySnapshot.forEach( function(doc) {
         			let currentVenue = {
            			id: doc.id,
            			name: doc.data().name
          			}
          			venuesFromDB.push(currentVenue)
          			// statements
        		})
      		}).catch(function(error){
      			console.error(error)
      		})
      	this.venues = venuesFromDB
		},
		getVenueId: function(){
			let venueFromForm = this.venue
			let IDToReturn = "I've Got Nothing"
			console.log("Name from form:" ,venueFromForm)
			this.venues.forEach(function(venue){
				if(venue.name === venueFromForm){
					console.log("venue name:" ,venue.name)
					console.log("venue ID:" ,venue.id)
					IDToReturn = venue.id
				}
			})
			return IDToReturn
		},
		addFestivalToVenue: function(festivalid){
			let venueRef = firebase.firestore.collection("venues").doc(this.getVenueId())
			venueRef.update({
				shows: fb.firestore.FieldValue.arrayUnion(festivalid)
			})
		},
		getGenresFromDB: function(){
			let genresFromDB=[]
        	firebase.firestore.collection("genres").get().then(function(querySnapshot){
            		querySnapshot.forEach( function(doc) {
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
        updateSelectedGenres: function(artistId){
			this.selectedGenres.forEach(function(genre){
				let docRef = firebase.firestore.collection('genres').doc('genre-'+genre)
				docRef.update({
					festivals: fb.firestore.FieldValue.arrayUnion(artistId)
				}).catch(function(error){
					console.error(error)
				})
			})
		},
		createTags: function(){
			let tempTags=[]
			tempTags.push(this.name)
			if(this.name.includes(" ")){
				this.name.split(" ").forEach((word)=>{
					tempTags.push(word)
				})
			}
			this.selectedGenres.forEach((genre)=>{
				tempTags.push(genre)
				if(this.genre.includes(" ")){
					this.genre.split(" ").forEach((word)=>{
						tempTags.push(word)
					})
				}
			})
			tempTags.forEach((tag)=>{
				tempTags.push(tag.toLowerCase())
				tempTags.push(tag.toUpperCase())
			})
			return tempTags
		}
	}
}
</script>
<style scoped>
.manualError{
	font-size: 12px;
	text-align: left;
	color: red;
}
</style>