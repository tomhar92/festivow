<template>
	<div class="addArtist">
		<h2>Add Artist</h2>
		<br>
		<v-layout>
			<v-container ms6 xs6>
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
					box
					hint="split to paragraphs by '_n'">
				</v-textarea>
				<v-combobox
            		v-model="selectedGenres"
            		label="Genres"
            		:items="genreNames"
            		:error-messages="genresErrors"
					@touch="$v.selectedGenres.$touch()"
					@blur="$v.selectedGenres.$touch()"
            		multiple>
            	</v-combobox>
            	<v-text-field
            		v-model="img"
            		type="url"
            		label="Image URL"
            		:error-messages="imgErrors"
            		@touch="$v.img.$touch()"
            		@blur="$v.img.$touch()">
            	</v-text-field>
            	<v-text-field
            		v-model="video"
            		type="url"
            		label="Video URL"
            		:error-messages="videoErrors"
            		@touch="$v.video.$touch()"
            		@blur="$v.video.$touch()">
            	</v-text-field>
            	<v-btn
            		color="primary"
            		@click="submit">
            		Submit
            	</v-btn>		
			</v-form>
			</v-container>	
		</v-layout>	
	</div>	
</template>
<script>
	import { required, url } from 'vuelidate/lib/validators'
	import GenresService from '@/services/GenresService.js'
	import ArtistsService from '@/services/ArtistsService.js'

	function isGenreSelected(){
		if(!this.selectedGenres.length)
			return false
		return true
	}
	
	export default {
		data: function(){
			return{
				name: '',
				desc: '',
				genres: [],
				selectedGenres: [],
				img: '',
				video: ''
			}
		},
		computed: {
			genreNames: function(){
				let genreNames = []
				this.genres.forEach(function(genre){
					genreNames.push(genre.name)
				})
				return genreNames
			},
			nameErrors(){
				let errors=[]
				if(!this.$v.name.$dirty)
					return errors
				if(!this.$v.name.required)
					errors.push('Name is required. ')
				return errors
			},
			descErrors(){
				let errors=[]
				if(!this.$v.desc.$dirty)
					return errors
				if(!this.$v.desc.required)
					errors.push('Description is required. ')
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
					errors.push('Field must be a valid URL!')
				return errors
			},
			videoErrors(){
				let errors=[]
				if(!this.$v.video.$dirty)
					return errors
				if(!this.$v.video.url)
					errors.push('Field must be a valid URL!')
				return errors
			}
		},
		validations: {
			name: {
				required
			},
			desc: {
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
		methods: {
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
    		},
			submit: async function(){
				this.$v.$touch()
				if(!this.$v.$invalid){
					let artist = {
						id: 'artist-'+Math.random().toString(36).substr(2, 16),
						name: this.name,
						desc: this.desc,
						img: this.img,
						video: this.video,
						shows: []
					}
					await this.updateSelectedGenres(artist.id)
					await ArtistsService.postArtists(artist)
					alert("Artist Posted Successully!")
				}
			},
			updateSelectedGenres: async function(artistId){
				for(let genre of this.selectedGenres){
					let artistGenre = {
						genreId: 'genre-'+genre,
						artistId: artistId
					}
					const result = await GenresService.addArtistToGenre(artistGenre)
					console.log(result)
				}
			}
		},
		mounted: function(){
			this.getGenresFromMongo()
		}
	}
</script>
<style scoped>
</style>