<template>
	<v-dialog v-model="editArtist" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Artist - {{name}}</h2>
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
				/>
				<v-combobox
            		v-model="selectedGenresForCombobox"
            		label="Genres"
            		:items="genresForCombobox"
            		:error-messages="genresErrors"
					@touch="$v.selectedGenres.$touch()"
					@blur="$v.selectedGenres.$touch()"
            		multiple>
            	</v-combobox>
            	<v-textarea
					v-model="img"
					label="Image URL"
					box
					:error-messages="imgErrors"
            		@touch="$v.img.$touch()"
            		@blur="$v.img.$touch()"
				/>
				<v-textarea
					v-model="video"
					label="Video URL"
					box
					:error-messages="videoErrors"
            		@touch="$v.video.$touch()"
            		@blur="$v.video.$touch()"
				/>
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
import { required, url } from 'vuelidate/lib/validators'
import GenresService from '@/services/GenresService.js'
import ArtistsService from '@/services/ArtistsService.js'

export default{
	data: function(){
		return{
			name: '',
			desc: '',
			img: '',
			video: '',
			selectedGenres: [],
			previousSelected: [],
			genres: [],
			editArtist: true
		}
	},
	props: {
		id: String
	},
	mounted: function(){
		this.getArtistFromMongo()
		this.getGenresFromMongo()
	},
	validations: {
		name: {
			required
		},
		desc: {
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
		descErrors(){
			let errors = []
			if(!this.$v.desc.$dirty)
				return errors
			if(!this.$v.desc.required)
				errors.push('Desc is required.')
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
				errors.push('Must be a valid url.')
			return errors
		},
		videoErrors(){
			let errors=[]
			if(!this.$v.video.$dirty)
				return errors
			if(!this.$v.video.url)
				errors.push('Must be a valid url.')
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
						genreNames.push(genre.name)
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
					this.previousSelected = this.selectedGenres
					this.selectedGenres = selectedGenresFromCombo
				}
		}	
	},
	methods: {
		getArtistFromMongo: async function(){
			let reqBody = {
         		id: this.id
        	}
        	const result = await ArtistsService.getArtist(reqBody)
        	this.name = result.data.name
        	this.desc = result.data.desc
        	this.img = result.data.img
        	this.video = result.data.video
        	await this.getArtistGenresFromDB()
		},
		getArtistGenresFromDB: async function(){
			let genresToReturn = []
      		let artistForReq = {
        		artistId: this.id
      		}
      		const result = await GenresService.getGenresByArtist(artistForReq)
      		if(result.data instanceof Array){
        		result.data.forEach((doc)=>{
        			let currentGenre = {
        				id: doc._id,
        				name: doc.name
        			}
          			genresToReturn.push(currentGenre)
        		})
      		}
      		console.log(genresToReturn)
      		this.selectedGenres = genresToReturn
		},
		submit: async function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let artist = {
						id: this.id, 
						name: this.name,
						desc: this.desc,
						img: this.img,
						video: this.video
				}
				const result = await ArtistsService.updateArtist(artist)
				console.log(result)
				this.deleteArtistFromPrevious()
				this.addArtistToSelected()
			}
		},
		deleteArtistFromPrevious: async function(){
      		let artistForReq = {
        		artistId: this.id
      		}
      		const result = await GenresService.getGenresByArtist(artistForReq)
      		if(result.data instanceof Array){
        		for(let doc of result.data){
          			console.log(doc)
          			let artistGenre = {
            			artistId: artistid,
            			genreId: doc._id
          			}
          			console.log(artistGenre)
          			await GenresService.removeArtistFromGenre(artistGenre)
          		}	
        	}
		},
		addArtistToSelected: async function(){
			let artistForReq = {
        		artistId: this.id
      		}
      		const result = await GenresService.getGenresByArtist(artistForReq)
      		if(result.data instanceof Array){
        		for(let doc of result.data){
          			console.log(doc)
          			let artistGenre = {
            			artistId: artistid,
            			genreId: doc._id
          			}
          			console.log(artistGenre)
          			await GenresService.addArtistToGenre(artistGenre)
        		}
        	}	
		},
		close: function(){
			this.editArtist = false
		},
		getGenresFromMongo: async function(){
      		let genresFromDB = []
      		const results = await GenresService.getAllGenres()
      		results.data.forEach((result)=> {
        		let currentGenre = {
          			id: result._id,
          			name: result.name
        		}
        		genresFromDB.push(currentGenre)
      		})
      		this.genres = genresFromDB
    	}
	}
}
</script>
<style scoped>
</style>