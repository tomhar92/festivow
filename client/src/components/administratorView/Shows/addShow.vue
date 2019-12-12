<template>
	<div class="addShow">
		<h2>Add Show</h2>
		<br>
		<v-layout>
			<v-container>
				<v-form>
					<v-combobox
						v-model="artist"
						label="Artist"
						:items="artistsForCombobox"
						:error-messages="artistErrors"
						@touch="$v.artist.$touch()"
						@blur="$v.artist.$touch()">
					</v-combobox>
					<v-combobox
						v-model="venue"
						label="Venue"
						:items="venuesForCombobox"
						:error-messages="venueErrors"
						@touch="$v.venue.$touch()"
						@blur="$v.venue.$touch()">
					</v-combobox>
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
        				ref="timeMenu"
        				:close-on-content-click="false"
        				v-model="timeMenu"
        				:nudge-right="40"
        				:return-value.sync="time"
        				lazy
        				transition="scale-transition"
        				offset-y
        				full-width
        				max-width="290px"
        				min-width="290px"
      					>
        				<v-text-field
          					slot="activator"
          					v-model="time"
          					label="Start Time"
          					prepend-icon="access_time"
          					readonly
        				></v-text-field>
        				<v-time-picker
          					v-if="timeMenu"
          					v-model="time"
          					color="primary"
          					@change="$refs.timeMenu.save(time)"
        				></v-time-picker>
      				</v-menu>
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
								:step="1"
								:error-messages="priceErrors"
								@touch="$v.priceErrors.$touch()"
								@blur="$v.priceErrors.$touch()">
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
import { required, url} from 'vuelidate/lib/validators'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

export default{
	data: function(){
		return {
			id: 'show-'+Math.random().toString(36).substr(2, 16),
			artist: null,
			artistFound: true,
			venue: null,
			venueFound: true,
			date: null,
			time: null,
			price: [],
			img: null,
			video: null,
			dateMenu: false,
			timeMenu: false,
			artists: [],
			venues: []
		}
	},
	created: function(){
		this.getVenuesFromDB()
		this.getArtistsFromDB()
	},
	validations: {
		artist: {
			required
		},
		venue: {
			required
		},
		date: {
			required
		},
		price: {
			required
		},
		img: {
			url
		},
		video: {
			url
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
		venueErrors(){
			let errors=[]
			if(!this.$v.venue.$dirty)
				return errors
			if(!this.$v.venue.required)
				errors.push('Venue is required.')
			if(!this.venueFound)
				errors.push('Can`t find venue in DB')
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
		priceErrors(){
			let errors=[]
			if(!this.$v.price.$dirty)
				return errors
			if(!this.$v.price.required)
				errors.push('Price is required.')
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
			let venueID = this.getVenueId()
			if(!this.$v.$invalid && this.artistFound && this.venueFound){
				let show = {
					id: this.id,
					artist: artistID,
					venue: venueID,
					date: this.date,
					time: this.time,
					price: this.price,
					img: this.img,
					video: this.video,
					reviews: []
				}
				firebase.firestore.collection("shows").doc(show.id).set(show)
				.then(()=>{
					this.addShowToArtist(artistID)
					this.addShowToVenue(venueID)
					alert('Show Successfully Added!')
				}).catch(function(error){
					console.error(error)
				})
			}
			else{
				alert("Form is not valid!")
			}
		},
		getVenueId: function(){
			this.venueFound = false
			let venueFromForm = this.venue
			let IDToReturn = "I've Got Nothing"
			this.venues.forEach((venue) => {
				if(venue.name === venueFromForm){
					IDToReturn = venue.id
					this.venueFound = true
				}
			})
			return IDToReturn
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
		},
		addShowToArtist: function(artistID){
			let docRef = firebase.firestore.collection("artists").doc(artistID)
			docRef.update({
				shows: fb.firestore.FieldValue.arrayUnion(this.id)
			})
		},
		addShowToVenue: function(venueID){
			let docRef = firebase.firestore.collection("venues").doc(venueID)
			docRef.update({
				shows: fb.firestore.FieldValue.arrayUnion(this.id)
			})
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