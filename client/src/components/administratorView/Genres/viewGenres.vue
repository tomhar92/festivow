<template>
	<div class="root" ref="container">
		<h2>Genres Info</h2>
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
    		:items="genres"
        :search="search"
    		class="elevation-1">
  			<template slot="items" slot-scope="props">
      			<td class="text-xs-left">{{ props.item.id }}</td>
      			<td class="text-xs-left">{{ props.item.name }}</td>
      			<td class="text-xs-left">{{ props.item.artists }}</td>
            <td class="text-xs-left">{{ props.item.festivals }}</td>
            <td class="text-xs-left">{{ props.item.tags }}</td>
            <td class="text-xs-left">
              <v-icon
                small
                class="mr-2"
                @click="editGenre(props.item.id)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteGenre(props.item.id)"
              >
              delete
            </v-icon>
          </td>
    		</template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
    	</v-data-table>	
   	</div>
</template>
<script>
import Vue from 'vue'
import editGenre from '@/components/administratorView/Genres/editGenre.vue'
import GenresService from '@/services/GenresService.js'

export default {
	data: function(){
		return{
			headers: [
			{ text: 'ID', value: 'id'},
			{ text: 'Name', value: 'name'},
			{ text: 'Artists', value: 'artists'},
      { text: 'Festivals', value: 'festivals'},
      { text: 'Tags', value: 'tags'},
      { text: 'Actions', sortable: 'false'}
			],
      genres: [],
      search: ''
		}
	},
  components: {
    editGenre
  },
	methods: {
    editGenre: function(genreid){
      var ComponentClass = Vue.extend(editGenre)
      var instance = new ComponentClass({
        propsData: {
          id: genreid
        }
      })
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    },
		deleteGenre: async function(genreid){
        let reqBody = {
          id: genreid
        }
        const result = await GenresService.deleteGenre(reqBody)
        alert(result.data)
        this.getGenresFromMongo()
		},
    getGenresFromMongo: async function(){
      let genresFromDB = []
      const results = await GenresService.getAllGenres()
      results.data.forEach((result)=> {
        let currentGenre = {
          id: result._id,
          name: result.name,
          artists: result.artists,
          festivals: result.festivals
        }
        genresFromDB.push(currentGenre)
      })
      this.genres = genresFromDB
    }
	},
  mounted(){
    this.getGenresFromMongo()
  }
}
</script>
<style scoped>
</style>
