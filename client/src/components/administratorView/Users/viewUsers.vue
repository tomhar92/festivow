<template>
	<div class="root">
		<h2>Users Info</h2>
		<br>
    <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <br>
    	<v-data-table
    		:headers="headers"
    		:items="users"
    		:search="search"
    		class="elevation-1">
  			<template slot="items" slot-scope="props">
      			<td class="text-xs-left">{{ props.item.name }}</td>
      			<td class="text-xs-left">{{ props.item.email }}</td>
      			<td class="text-xs-left">{{ props.item.age }}</td>
      			<td class="text-xs-left">{{ props.item.city }}</td>
      			<td class="text-xs-left">{{ props.item.country }}</td>
      			<td class="text-xs-left">
              <v-icon
                small
                @click="deleteUser(props.item.id)"
              >
                delete
              </v-icon>
            </td>
    		</template>
    	</v-data-table>	
   	</div>	
</template>
<script>
const firebase = require('../../../firebaseConfig.js')

export default {
	data: function(){
		return{
			headers: [
				{ text: 'User Name', value: 'name'},
				{ text: 'Email', value: 'email'},
				{ text: 'Age', value: 'age'},
				{ text: 'City', value: 'city'},
				{ text: 'Country', value: 'country'},
				{ text: 'Actions'}
			],
			users: [],
      search: ''
		}	
	},
	mounted() {
			this.getUsersFromDB()
		},
	methods: {
      getUsersFromDB: function(){
        let usersFromDB = []
          firebase.firestore.collection("users").get().then(function(querySnapshot){
            querySnapshot.forEach( function(doc) {
              let currentUser = {
                  id: doc.id,
                  name: doc.data().name,
                  email: doc.data().email,
                  country: doc.data().country,
                  city: doc.data().city,
                  age: doc.data().age
                }
                usersFromDB.push(currentUser)
                // statements
            })
          })
          this.users = usersFromDB
      },
    	deleteUser: function(id){
      		console.log("Trying to delete " +id)
      		firebase.firestore.collection("users").doc(id).delete().then(function(){
       			alert("Deleted Document Successfully")
            this.getUsersFromDB();
      		}).catch(function(error){
        		alert(error)
      		})
    	}
  	} 
}
</script>
<style scoped>
</style>	