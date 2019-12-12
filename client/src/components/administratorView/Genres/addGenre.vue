<template>
	<div class="addGenre">
		<h2>Add New Genre</h2>
		<br>
		<v-layout>
			<v-container ms6 xs6>
				<v-form>
					<v-text-field
						v-model="name"
						label="Name"
						:error-messages="nameErrors"
						@touch="$v.name.$touch()"
						@blur="$v.name.$touch()"
					/>
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
import { required } from 'vuelidate/lib/validators'
import GenresService from '@/services/GenresService.js'

export default{
	data: function(){
		return{
			name: ''
		}
	},
	validations: {
		name: {
			required
		}
	},
	methods: {
		submit: async function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let genre = {
					id: 'genre-'+this.name,
					name: this.name,
					artists: [],
					festivals: []
				}
				await GenresService.postGenres(genre)
				alert("Genre Posted Successully!")
			}	
		}
	},
	computed: {
		nameErrors(){
			let errors=[]
			if(!this.$v.name.$dirty)
				return errors
			if(!this.$v.name.required)
				errors.push('Name is required. ')
			return errors
		}
	}
}
</script>
<style scoped>
</style>