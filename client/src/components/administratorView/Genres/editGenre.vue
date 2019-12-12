<template>
	<v-dialog v-model="editGenre" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Genre - {{name}}</h2>
			</v-card-title>
			<v-card-text>
				<v-text-field
						v-model="name"
						label="Name"
						:error-messages="nameErrors"
						@touch="$v.name.$touch()"
						@blur="$v.name.$touch()"
				/>
				<v-combobox
            		v-model="selectedArtistsForCombobox"
            		label="Artists"
            		:items="artistsForCombobox"
            		multiple>
            	</v-combobox>
            	<v-combobox
            		v-model="selectedFestivalsForCombobox"
            		label="Festivals"
            		:items="festivalsForCombobox"
            		multiple>
            	</v-combobox>		
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
			</v-card-text>			
		</v-card>	
	</v-dialog>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import GenresService from '@/services/GenresService.js'
import ArtistsService from '@/services/ArtistsService.js'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig.js')

export default{
	data: function(){
		return{
			name: '',
			selectedArtists: [],
			previousArtists: [],
			artists: [],
			selectedFestivals: [],
			previousFestivals: [],
			festivals: [],
			editGenre: true
		}
	},
	props: {
		id: String
	},
	mounted: function(){
		this.getGenreFromMongo()
		this.getArtistsFromMongo()
	//	this.getFestivalsFromDB()
	},
	validations: {
		name: {
			required
		}
	},
	asyncComputed: {
		selectedArtistsForCombobox:{
			get: async function(){
				const returnArtists = await this.getSelectedArtistsNames()
				console.log(returnArtists)
				return returnArtists
			},
			set: function(newValue){
					let selectedArtistsFromCombobox = []
					newValue.forEach((selectedArtist)=>{
						this.artists.forEach(function(artist){
							if (artist.name === selectedArtist)
								selectedArtistsFromCombobox.push(artist.id)
						})
					})
					this.previousArtists = this.selectedArtists
					this.selectedArtists = selectedArtistsFromCombobox
				}
		}
	},
	computed: {
		nameErrors(){
			let errors = []
			if(!this.$v.name.$dirty)
				return errors
			if(!this.$v.name.required)
				errors.push('Name is required. ')
			return errors
		},
		artistsForCombobox: function(){
			let artistNames = []
			this.artists.forEach(function(artist){
				artistNames.push(artist.name)
			})
			return artistNames
		},
		festivalsForCombobox: function(){
			let festivalNames = []
			this.festivals.forEach(function(festival){
				festivalNames.push(festival.name)
			})
			return festivalNames
		},
		selectedFestivalsForCombobox:{
			get: function(){
					let festivalNames = []
					this.selectedFestivals.forEach(function(festival){
						let docRef = firebase.firestore.collection("festivals").doc(festival)
						docRef.get().then(function(doc){
							if(doc.exists)
								festivalNames.push(doc.data().name)
							else
								console.error("Doc doesn't exist!")
						}).catch(function(error){
							console.error(error)
						})
					})
					return festivalNames
				},
			set: function(newValue){
					let selectedFestivalsFromCombobox = []
					newValue.forEach((selectedFestival)=>{
						this.festivals.forEach(function(festival){
							if (festival.name === selectedFestival)
								selectedFestivalsFromCombobox.push(festival.id)
						})
					})
					this.previousFestivals = this.selectedFestivals
					this.selectedFestivals = selectedFestivalsFromCombobox
				}
		},
	},
	methods: {
		getGenreFromMongo: async function(){
			let reqBody = {
         		id: this.id
        	}
        	const result = await GenresService.getGenre(reqBody)
        	this.name = result.data.name
        	this.selectedArtists = result.data.artists
        	this.selectedFestivals = result.data.festivals 
		},
		getArtistsFromMongo: async function(){
      		let artistsFromDB = []
      		const results = await ArtistsService.getAllArtists()
      			if(results.data instanceof Array){
        			results.data.forEach((result)=> {
          				let currentArtist = {
            				id: result._id,
            				name: result.name
            			}
          				artistsFromDB.push(currentArtist)
        			})
      			}  
      		this.artists = artistsFromDB
    	},
		getFestivalsFromDB: function(){
			let festivalsFromDB=[]
			firebase.firestore.collection("festivals").get().then(function(querySnapshot){
				querySnapshot.forEach(function(doc){
					let currentFestival = {
						id: doc.id,
						name: doc.data().name
					}
					festivalsFromDB.push(currentFestival)
				})
			}).catch(function(error){
				console.error(error)
			})
			this.festivals = festivalsFromDB
		},
		submit: async function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let genre = {
					id: this.id,
					newId: 'genre-'+this.name,
					name: this.name,
					artists: this.selectedArtists,
					festivals: this.selectedFestivals
				}
				const result = await GenresService.updateGenre(genre)
				alert("Finished")
				this.close()
			}
			else{
				alert("Form is not valid!")
			}

		},
		getSelectedArtistsNames: async function(){
			let artistNames = []
				if(this.selectedArtists.length>0){
					for(let artist of this.selectedArtists){
						let artistForMongo = {
							id: artist
						}
						const results = await ArtistsService.getArtist(artistForMongo)
      					if(results.data){
        					artistNames.push(results.data.name)
						}
					}
				}
				return artistNames
		},
		close: function(){
			this.editGenre = false
		}
	}
}
</script>
<style scoped>
</style>