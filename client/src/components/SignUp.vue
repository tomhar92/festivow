<template>
	<div class="sign-up">

		<h1 class="text">Sign Up</h1>
		<h2 class="text">Let's Create a New Account!</h2>
			<v-layout justify-center>
				<v-form>
					<v-text-field
						v-model="name"
						label="Name"
						:error-messages="nameErrors"
						@touch="$v.name.$touch()"
      					@blur="$v.name.$touch()"
      					counter
      					hint="At least 4 characters"
						>
					</v-text-field>
					<v-text-field
						v-model="password"
						type="password"
						label="Password"
						hint="At least 6 characters"
						:error-messages="passwordErrors"
						@touch="$v.password.$touch()"
						@blur="$v.password.$touch()"
						counter >
					</v-text-field>	
					<v-text-field
						v-model="confirmPassword"
						type="password"
						label="Confirm Password"
						:error-messages="confirmPasswordErrors"
						@touch="$v.confirmPassword.$touch()"
						@blur="$v.confirmPassword.$touch()"
						counter >
					</v-text-field>	
            		<v-text-field
            			v-model="email"
            			label="E-Mail"
            			:error-messages="emailErrors"
            			@touch="$v.email.$touch()"
            			@blur="$v.email.$touch()"
            			 >
            		</v-text-field>
            		<v-text-field
            			type="Number"
            			v-model="age"
            			label="Age"
            			:error-messages="ageErrors"
            			@touch="$v.age.$touch()"
            			@blur="$v.age.$touch()"
            			>
            		</v-text-field>	
            		<v-text-field
            			v-model="city"
            			label="City"
            			>
            		</v-text-field>
            		<v-combobox
            			v-model="country"
            			label="Country"
            			:items="countries"
            			>
            		</v-combobox>	
            		<v-btn
            		color="primary" 
            		@click="signUp">Sign Up</v-btn>	
            </v-form>    	
	</v-layout>	
	<h3 class="text"><router-link to="/login">Go back to login</router-link></h3>
	</div>	
</template>	

<script>
	import router from '../router/index.js'
	import { required, minLength, between, email, sameAs } from 'vuelidate/lib/validators' 
	const firebase = require('../firebaseConfig.js')

	const onlyAlphaAndSpaces = function(value) {
		if(/^[a-zA-Z\s]+$/.test(value)){
			return true
		}
		return false
	}

	const atLeastOneCapital = function(value) {
		if(/[A-Z]/.test(value))
			return true
		return false
	}

	const atLeastOneLetter = function(value) {
		if(/[a-z]/.test(value))
			return true
		return false
	}

	const atLeastOneNumber = function(value){
		if(/[0-9]/.test(value))
			return true
		return false
	}

	export default {
		data: function() {
			return {
				email: '',
	  			password: '',
	  			confirmPassword: '',
	  			name: '',
	  			age: 18,
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
				required,
				minLength: minLength(4),
				onlyAlphaAndSpaces
			},
			password: {
				required,
				minLength: minLength(6),
				atLeastOneCapital,
				atLeastOneLetter,
				atLeastOneNumber
			},
			confirmPassword: {
				required,
				sameAs: sameAs('password')
			},
			email: {
				required,
				email
			},
			age: {
				required,
				between: between(12, 120)
			}
		},
		computed: {
			nameErrors(){
				let errors = []
        		if (!this.$v.name.$dirty) return errors
        		if(!this.$v.name.required)
        		   errors.push('Name is required.')
        		if(!this.$v.name.minLength)
        			errors.push('Name must be at least 4 characters long')
        		if(!this.$v.name.onlyAlphaAndSpaces)
        			errors.push('Only alphabeat characters or spaces.')
        		return errors
			},
			passwordErrors(){
				let errors = []
				if (!this.$v.password.$dirty) return errors
				if (!this.$v.password.required)
					errors.push('Password is required. ')
				if(!this.$v.password.minLength)
					errors.push('Password must be at least 6 characters long')	
				if(!this.$v.password.atLeastOneCapital)
					errors.push('Must contain at least one capital letter')
				if(!this.$v.password.atLeastOneLetter)
					errors.push('Must contain at least one small letter')
				if(!this.$v.password.atLeastOneNumber)
					errors.push('Must contain at least one number')
				return errors

			},
			confirmPasswordErrors(){
				let errors=[]
				if(!this.$v.confirmPassword.$dirty)
					return errors
				if(!this.$v.confirmPassword.required)
					errors.push('Confirm password is required. ')
				if(!this.$v.confirmPassword.sameAs)
					errors.push('Password needs to be the same. ')
				return errors			
			},
			emailErrors(){
				let errors=[]
				if(!this.$v.email.$dirty)
					return errors
				if(!this.$v.email.required)
					errors.push('Email is required. ')
				if(!this.$v.email.email)
					errors.push('Must be a valid email address')
				return errors
			},
			ageErrors(){
				let errors=[]
				if(!this.$v.age.$dirty)
					return errors
				if(!this.$v.age.required)
					errors.push('Age is required. ')
				if(!this.$v.age.between)
					errors.push('Age must be between 12 and 120. ')
				return errors
			}
		},
		methods: {
			signUp: function() {
				this.$v.$touch()
				if(!this.$v.$invalid){
					let userForFirestone = {
	            		email: this.email,
	      	    		name: this.name,
	      	    		age: this.age,
	      	    		city: this.city,
	      	    		country: this.country,
	      	    		admin: false,
	      	    		reviews: []
	         		}
	      			firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then(
            		(user) => {
            			let userId = firebase.auth.currentUser.uid   
	         			firebase.firestore.collection("users").doc(userId).set(userForFirestone)
	         			this.$store.commit('user/setCurrentUser', userId)
	         			this.$store.dispatch('user/fetchUserProfile', userId)
             			alert('Your account has been created!')
             			router.push('hello')
            		},
            		function(err){
              			alert('Oops! ' +err.message)  
            		})
            	}	
			}
		}
	}


</script>

<style scoped>

.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
.text {
	margin: 10px;
	font-family: 'Roboto', sans-serif;
}
</style>

