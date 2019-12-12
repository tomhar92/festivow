<template>
	<v-dialog v-model="openPassword" persistent max-width="500px">
		<v-card>
			<v-card-title>
          		<h4>Change Password</h4>
          	</v-card-title>
          	<v-card-text>	
          		<v-text-field
            		v-model="password"
            		type="password"
            		label="New Password"
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
          		<v-btn
            		color="primary"
            		@click="changePassword"
            	>Submit New Password
          		</v-btn> 
          		<v-btn
            		color="primary"
            		@click="openPassword = false">
            		Close
          		</v-btn>
          	</v-card-text>
        </v-card>  		    
    </v-dialog>    
</template>
<script>
import { required, minLength, between, email, sameAs } from 'vuelidate/lib/validators'
const firebase = require('../../firebaseConfig.js')

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

  export default{
  		data: function(){
  			return{
  				password: '',
  				confirmPassword: '',
  				openPassword: true
  			}
  		},
  		validations: {
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
      		}
  		},
  		computed: {
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
      		}
  		},
  		methods: {
    		changePassword: function(){
    			this.$v.$touch()
    			console.log("Checking if password form is valid")
				if(!this.$v.$invalid){
      				let user = firebase.auth.currentUser;
      				let newPassword = this.password;
      				console.log("Trying to update password")
      				user.updatePassword(newPassword).then(function(){
      					alert("password updated successfully!")
      				}).
      				catch(function(error){
      					console.error(error)
      				})
      			}
      			this.openPassword = false	
    		}
  		}	
}  	
</script>
<style scoped>
</style>	

