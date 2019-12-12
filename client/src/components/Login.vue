<template>
	<div class="login">
		<h1>Sign In</h1>
		<v-layout justify-center>
			<v-form>
				<v-text-field
					type="email"
					v-model="email"
					label="Email"
					:error-messages="emailErrors"
					@touch="$v.email.$touch()"
					@blur="$v.email.$touch()"
				/>
				<v-text-field
					type="password"
					v-model="password"
					label="Password"
					:error-messages="passwordErrors"
					@touch="$v.password.$touch()"
					@blur="$v.password.$touch()"
				/>
				<v-btn
					color="primary"
					@click="login">
					Sign In
				</v-btn>		
			</v-form>	
		</v-layout>	
		<p>You don't have an account yet? You can <router-link to="/signup">create one</router-link></p>
	</div>	
</template>	

<script>
	import router from '../router/index.js'
	import { required, email } from 'vuelidate/lib/validators'
	const firebase = require('../firebaseConfig')

	export default {
	  name: 'login',
	  data: function() {
	  	return {
	  		email: '',
	  		password: ''
	  	}
	  },
	  validations: {
	  	email: {
	  		required,
	  		email
	  	},
	  	password: {
	  		required
	  	}
	  },
	  methods: {
	  	login: function(){
	  		
	  		firebase.auth.signInWithEmailAndPassword(this.email, this.password).then(
	  			user => {
	  				var currentUser = firebase.auth.currentUser
	  				this.$store.commit('user/setCurrentUser', currentUser.uid)
	  				this.$store.dispatch('user/fetchUserProfile', currentUser.uid)
	  				alert("Signed In Successfully!")
	  				router.push('hello')
	  			}).catch((err) => {
	  				alert(err)
	  			}	
	  			)	
	  	}
	  },
	  computed: {
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
	  	passwordErrors(){
	  		let errors=[]
			if(!this.$v.password.$dirty)
				return errors
			if(!this.$v.password.required)
				errors.push('Password is required. ')
			return errors
	  	}
	  }
	}

</script>

<style scoped>
.login {
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
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>

