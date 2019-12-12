<template>
	<v-dialog v-model="editSlide" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Slide - {{name}}</h2>
			</v-card-title>
			<v-card-text>
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
				/>
				<v-text-field
						v-model="img"
						label="Image URL"
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
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig')

export default{
	data: function(){
		return{
			id: '',
			headline: '',
			desc: '',
			img: '',
			linkTo: '',
			editSlide: true
		}
	},
	props: {
		id: String
	},
	mounted: function(){
		let docRef = firebase.firestore.collection("slides").doc(this.id)
		docRef.get().then((doc) => {
			if(doc.exists){
				this.id=doc.id
				this.headline=doc.data().headline
				this.desc=doc.data().desc
				this.img=doc.data().img
				this.linkTo=doc.data().linkTo
			}
			else{
				console.error("Doc doesn't exist!")
			}
		}).catch(function(error){
			console.error(error)
		})
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
					id: this.id,
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
		},
		close: function(){
			this.editSlide = false
		}
	}
}
</script>
<style scoped>
</style>