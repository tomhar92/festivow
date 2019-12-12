<template>
	<v-dialog v-model="editVenue" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h2>Edit Venue - {{name}}</h2>
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
				<v-text-field
						v-model="capacity"
						label="Capacity"
						type="Number">
				</v-text-field>
				<v-text-field
						v-model="address"
						label="Address">
					</v-text-field>	
					<v-text-field
						v-model="city"
						label="City"
						:error-messages="cityErrors"
						@touch="$v.city.$touch()"
						@blur="$v.city.$touch()">
					</v-text-field>	
					<v-combobox
            			v-model="country"
            			label="Country"
            			:items="countries"
            			:error-messages="countryErrors"
						@touch="$v.country.$touch()"
						@blur="$v.country.$touch()"
            			>
            		</v-combobox>
            		<v-text-field
						v-model="tagField"
						label="Tags"
						:error-messages="tagFieldErrors"
						@touch="$v.tagField.$touch()"
						@blur="$v.tagField.$touch()"
						hint="Split values by commas">
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
			</v-card-text>			
		</v-card>	
	</v-dialog>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import * as fb from 'firebase'
const firebase = require('../../../firebaseConfig')

export default{
	data: function(){
		return{
			name: '',
			editVenue: true,
			desc: '',
			capacity: 0,
			address: '',
			city: '',
			country: null,
			tagField: '',
			tags: [],
			countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
	,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]		}
	},
	props: {
		id: String
	},
	mounted: function(){
		let docRef = firebase.firestore.collection("venues").doc(this.id)
		docRef.get().then((doc) => {
			if(doc.exists){
				this.name=doc.data().name
				this.desc=doc.data().desc
				this.capacity=doc.data().capacity
				this.address=doc.data().address
				this.city=doc.data().city
				this.country=doc.data().country
				this.tagField=this.createTagField(doc.data().tags)
			}
			else{
				console.error("Doc doesn't exist!")
			}
		}).catch(function(error){
			console.error(error)
		})
	},
	validations: {
		name: {
			required
		},
		desc: {
			required
		},
		city: {
			required
		},
		country: {
			required
		},
		tagField: {
			required
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
		cityErrors(){
			let errors = []
			if(!this.$v.city.$dirty)
				return errors
			if(!this.$v.city.required)
				errors.push('City is required.')
			return errors
		},
		countryErrors(){
			let errors = []
			if(!this.$v.country.$dirty)
				return errors
			if(!this.$v.country.required)
				errors.push('Country is required.')
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
		submit: function(){
			this.$v.$touch()
			if(!this.$v.$invalid){
				let venue = {
						id: this.id, 
						name: this.name,
						desc: this.desc,
						address: this.address,
						city: this.city,
						country: this.country,
						tags: this.splitToTags()
				}
				firebase.firestore.collection("venues").doc(venue.id).set(venue)
				.then(()=>{
					alert('Venue Successfully Edited!')
					this.editVenue = false
				}).catch(function(error){
					console.error(error)
				})
				}
				else{
					alert("Form is not valid!")
				}
			},
		close: function(){
			this.editVenue = false
		},
		createTagField: function(tagsArray){
			return tagsArray.join()
		},
		splitToTags: function(){
			return this.tagField.split(",")
		}
	}
}
</script>
<style scoped>
</style>