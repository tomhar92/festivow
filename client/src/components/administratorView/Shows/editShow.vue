<template>
	<v-dialog v-model="editShow" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Show</h2>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-combobox
						v-model="selectedArtistForCombobox"
						label="Artist"
						:items="artistsForCombobox"
						:error-messages="artistErrors"
						@touch="$v.artist.$touch()"
						@blur="$v.artist.$touch()">
					</v-combobox>
					<v-combobox
						v-model="selectedVenueForCombobox"
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
						@click="submit">
						Submit
					</v-btn>
					<v-btn
						color="primary"
						@click="close">
						Close
					</v-btn>
				</v-form>	
			</v-card-text>			
		</v-card>	
	</v-dialog>
</template>
<script>
import { required, url } from 'vuelidate/lib/validators'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig')

export default{
	data: function(){
		return{
			artist: null,
			previousArtist: null,
			artistFound: false,
			venue: null,
			previousVenue: null,
			venueFound: false,
			date: null,
			time: null,
			price: [],
			img: null,
			video: null,
			dateMenu: false,
			timeMenu: false,
			artists: [],
			venues: [],
			editShow: true
		}
	},
	props: {
		id: String
	},
	created: function(){
		let docRef = firebase.firestore.collection("shows").doc(this.id)
		docRef.get().then((doc) => {
			if(doc.exists){
				this.artist=doc.data().artist
				this.venue=doc.data().venue
				this.date=doc.data().date
				this.time=doc.data().time
				this.price=doc.data().price
				this.img=doc.data().img
				this.video=doc.data().video
			}
			else{
				console.error("Doc doesn't exist!")
			}
		}).catch(function(error){
			console.error(error)
		})
		this.getArtistsFromDB()
		this.getVenuesFromDB()
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
		artistsForCombobox: function(){
			let artistNames = []
			this.artists.forEach(function(artist){
				artistNames.push(artist.name)
			})
			return artistNames
		},
		selectedArtistForCombobox:{
			get: function(){
				let artistName = null
				this.artists.forEach((artist) => {
					if(this.artist===artist.id){
						artistName = artist.name
					}	
				})
				return artistName
			},
			set: function(newValue){
				this.artists.forEach((artist)=>{
					if(newValue===artist.name){
						this.previousArtist = this.artist
						this.artist = artist.id
						this.artistFound=true
					}
				})
				if(newValue === null){
					this.previousArtist = this.artist
					this.artist = null
				}
			}
		},
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
						this.venueFound=true
					}
				})
				if(newValue === null){
					this.previousVenue = this.venue
					this.venue = null
				}
			}
		},
		artistErrors(){
			let errors = []
			if(!this.$v.artist.$dirty)
				return errors
			if(!this.$v.artist.required)
				errors.push('Artist is required. ')
			return errors
		},
		venueErrors(){
			let errors = []
			if(!this.$v.venue.$dirty)
				return errors
			if(!this.$v.venue.required)
				errors.push('Venue is requied.')
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
			let errors = []
			if(!this.$v.img.$dirty)
				return errors
			if(!this.$v.img.url)
				errors.push('Img must be a valid url.')
			return errors
		},
		videoErrors(){
			let errors=[]
			if(!this.$v.video.$dirty)
				return errors
			if(!this.$v.video.url)
				errors.push('Video must be a valid url.')
			return errors
		}
	},
	methods: {
		getArtistsFromDB: function(){
			let artistsFromDB=[]
			firebase.firestore.collection("artists").get().then(function(querySnapshot){
				querySnapshot.forEach(function(doc){
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
		submit: function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let show = {
					id: this.id,
					artist: this.artist,
					venue: this.venue,
					date: this.date,
					time: this.time,
					price: this.price,
					img: this.img,
					video: this.video
				}
				firebase.firestore.collection("shows").doc(show.id).set(show)
				.then(()=>{	
					this.deleteShowFromPrevious()
					this.addShowToSelected()
					alert('Show Successfully Edited!')
					this.editShow = false
				}).catch(function(error){
					console.error(error)
				})
			}
			else{
				alert("Form is not valid!")
			}

		},
		deleteShowFromPrevious: function(){
			if(this.artistFound){
				let artistRef = firebase.firestore.collection("artists").doc(this.previousArtist)
				artistRef.update({
					shows: fb.firestore.FieldValue.arrayRemove(this.id)
				})
			}
			if(this.venueFound){	
				let venueRef = firebase.firestore.collection("venues").doc(this.previousVenue)
				venueRef.update({
					shows: fb.firestore.FieldValue.arrayRemove(this.id)
				})
			}	
		},
		addShowToSelected: function(){
			if(this.artistFound){
				let artistRef = firebase.firestore.collection("artists").doc(this.artist)
				artistRef.update({
					shows: fb.firestore.FieldValue.arrayUnion(this.id)
				})
			}
			if(this.venueFound){	
				let venueRef = firebase.firestore.collection("venues").doc(this.venue)
				venueRef.update({
					shows: fb.firestore.FieldValue.arrayUnion(this.id)
				})
			}	
		},
		close: function(){
			this.editShow = false
		}
	}
}
</script>
<style scoped>
</style>