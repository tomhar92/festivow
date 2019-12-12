<template>
	<div class="addVenue">
		<h2>Add Venue</h2>
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
						box>
					</v-textarea>	
					<v-text-field
						v-model="capacity"
						label="Capacity"
						type="Number"
						:error-messages="capacityErrors"
						@touch="$v.capacity.$touch()"
						@blur="$v.capacity.$touch()">
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
	import { required, numeric } from 'vuelidate/lib/validators'
	const firebase = require('../../../firebaseConfig.js')

	function isCountrySelected(){
		if(this.country === null)
			return false
		return true
	}
	export default{
		data: function(){
			return{
				name: '',
				desc: '',
				capacity: 0,
				address: '',
				city: '',
				country: null,
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
	,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
			}
		},
		validations: {
			name: {
				required
			},
			capacity: {
				numeric
			},
			city: {
				required
			},
			country: {
				isCountrySelected
			}
		},
		computed: {
			nameErrors(){
				let errors = []
        		if (!this.$v.name.$dirty) return errors
        		if(!this.$v.name.required)
        		   errors.push('Name is required.')
        		return errors
			},
			capacityErrors(){
				let errors = []
				if(!this.$v.capacity.$dirty) return errors
				if(!this.$v.capacity.numeric)
					errors.puch('Capacity must be a number')
				return errors
			},
			cityErrors(){
				let errors=[]
				if(!this.$v.city.$dirty) return errors
				if(!this.$v.city.required)
					errors.push('City is required.')
				return errors
			},
			countryErrors(){
				let errors=[]
				if(!this.$v.country.$dirty)
					return errors
				if(!this.$v.country.isCountrySelected)
					errors.push('Country is required')
				return errors		
			}
		},
		methods: {
			submit: function(){
				this.$v.$touch()
				if(!this.$v.$invalid){
					let venue = {
						id: 'venue-'+Math.random().toString(36).substr(2, 16),
						name: this.name,
						desc: this.desc,
						capacity: this.capacity,
						address: this.address,
						city: this.city,
						country: this.country,
						shows: [],
						tags: this.createTags()
					}
					console.log(venue)
					firebase.firestore.collection("venues").doc(venue.id).set(venue)
					.then(()=>{
						alert('Venue Successfully Added!')
					}).catch(function(error){
						console.error(error)
					})
				}
			},
			createTags: function(){
				let tempTags=[]
				tempTags.push(this.name)
				if(this.name.includes(" ")){
					this.name.split(" ").forEach((word) => {
						tempTags.push(word)
					})
				}
				tempTags.push(this.city)
				if(this.city.includes(" ")){
					this.city.split(" ").forEach((word) => {
						tempTags.push(word)
					})
				}
				tempTags.push(this.country)
				if(this.country.includes(" ")){
					this.country.split(" ").forEach((word) => {
						tempTags.push(word)
					})
				}
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
</style>	