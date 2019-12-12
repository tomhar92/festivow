<template>
	<div class="addHeadline">
		<h2>Add New Slide</h2>
		<br>
		<v-layout>
			<v-container ms6 xs6>
				<v-form>
					<v-text-field
						v-model="headline"
						label="Headline"
						:error-messages="headlineErrors"
						@touch="$v.headline.$touch()"
						@blur="$v.headline.$touch()"
					/>
					<v-textarea
						v-model="desc"
						label="Description"
						box
						:error-messages="descErrors"
						@touch="$v.desc.$touch()"
						@blur="$v.desc.$touch()"
					/>
					<v-text-field
						v-model="img"
						label="Background Image Url"
						:error-messages="imgErrors"
						@touch="$v.img.$touch()"
						@blur="$v.img.$touch()"
					/>
					<v-text-field
						v-model="linkTo"
						label="Link"
						:error-messages="linkToErrors"
						@touch="$v.linkTo.$touch()"
						@blur="$v.linkTo.$touch()"
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
import { required, url } from 'vuelidate/lib/validators'
const firebase = require('../../../firebaseConfig')

export default{
	data: function(){
		return{
			headline: '',
			desc: '',
			img: '',
			linkTo: ''
		}
	},
	validations: {
		headline: {
			required
		},
		desc: {
			required
		},
		img: {
			required,
			url
		},
		linkTo: {
			required,
			url
		}
	},
	computed: {
		headlineErrors(){
			let errors=[]
			if(!this.$v.headline.$dirty)
				return errors
			if(!this.$v.headline.required)
				errors.push('Headline is required. ')
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
		imgErrors(){
			let errors=[]
			if(!this.$v.img.$dirty)
				return errors
			if(!this.$v.img.required)
				errors.push('Image is required. ')
			if(!this.$v.img.url)
				errors.push('Image must be url. ')
			return errors
		},
		linkToErrors(){
			let errors=[]
			if(!this.$v.linkTo.$dirty)
				return errors
			if(!this.$v.linkTo.required)
				errors.push('Link is required. ')
			if(!this.$v.linkTo.url)
				errors.push('Link must be url. ')
			return errors
		}
	},
	methods: {
		submit: function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let slide = {
					id: 'slide-'+Math.random().toString(36).substr(2, 16),
					headline: this.headline,
					desc: this.desc,
					img: this.img,
					linkTo: this.linkTo
				}
				firebase.firestore.collection("slides").doc(slide.id).set(slide)
				.then(()=>{
					alert('Slide Successfully Added!')
				}).catch(function(error){
					console.error(error)
				})
			}	
		}
	}
}
</script>
<style>
</style>	