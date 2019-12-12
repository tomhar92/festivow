<template>
	<v-dialog v-model="openDelete" persistent max-width="500px">
		<v-card>
			<v-card-title>
				<h4>Delete User</h4>
			</v-card-title>	
			<v-card-text>
				<h2>Are You Sure?</h2>
				<p>Deleting your user is a permanent action.</p>
				<br>
				<br>
				<v-btn
				 color="primary"
				 @click="deleteUser">
				 Delete User
				</v-btn>
				<v-btn
				 color="primary"
				 @click="openDelete = false">
				 Close
				</v-btn>  
			</v-card-text>	
		</v-card>	
	</v-dialog>	
</template>
<script>
import router from '../../router/index.js'
import store from '../../store.js'
const firebase = require('../../firebaseConfig.js')
export default {
	data: function(){
		return {
			openDelete: true
		}
	},
	methods: {
		deleteUser: function () {
			let user = firebase.auth.currentUser
			const docId = user.uid
			console.log("Trying to delete user ", docId)
			user.delete().then(() => {
			}).catch(function(error) {
  				console.error("Error deleting user: ", error)
			})
			firebase.firestore.collection("users").doc(docId).delete().then(() => {
						console.log('Trying to Log Out in Vuex')
						store.dispatch('user/logOutUser')	
    					alert("User Deleted Successfully!")
				}).catch(function(error) {
    				console.error("Error removing document: ", error);
				})
			router.push('hello')	
			this.openDelete = false
		}
	}
}
</script>
<style>
</style>	