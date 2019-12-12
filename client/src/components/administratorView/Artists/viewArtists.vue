<template>
	<div class="root" ref="container">
		<h2>Artists Info</h2>
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
    		:items="artists"
    		:search="search"
    		class="elevation-1">
  			<template slot="items" slot-scope="props">
      			<td class="text-xs-left">{{ props.item.id }}</td>
      			<td class="text-xs-left">{{ props.item.name }}</td>
      			<td class="text-xs-left">{{ props.item.desc }}</td>
      			<td class="text-xs-left">{{ props.item.genres }}</td>
            <td class="text-xs-left">{{ props.item.shows }}</td>
            <td class="text-xs-left">
               <v-icon
                small
                class="mr-2"
                @click="editArtist(props.item.id)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteArtist(props.item.id)"
              >
              delete
            </v-icon>
            </td>
    		</template>
    	</v-data-table>	
   	</div>
</template>
<script>
import Vue from 'vue'
import editArtist from '@/components/administratorView/Artists/editArtist.vue'
import GenresService from '@/services/GenresService.js'
import ArtistsService from '@/services/ArtistsService.js'

export default {
	data: function(){
		return{
			headers: [
			 { text: 'ID', value: 'id'},
			 { text: 'Name', value: 'name'},
			 { text: 'Description', value: 'desc'},
			 { text: 'Genres', value: 'genres'},
       { text: 'Shows', value: 'shows'},
			 { text: 'Actions'}
			],
      artists: [],
      search: ''
		}
	},
  components: {
    editArtist
  },
	methods: {
		deleteArtist: async function(artistid){
      		let reqBody = {
            id: artistid
          }
        const result = await ArtistsService.deleteArtist(reqBody)
        await this.deleteArtistFromGenre(artistid)
        alert(result.data)
        this.getArtistsFromMongo()
		},
    editArtist: function(artistid){
      var ComponentClass = Vue.extend(editArtist)
      var instance = new ComponentClass({
        propsData: {
          id: artistid
        }
      })
      instance.$mount()
      this.$refs.container.appendChild(instance.$el)
    },
    getArtistsFromMongo: async function(){
      let artistsFromDB = []
      const results = await ArtistsService.getAllArtists()
      if(results.data instanceof Array){
        results.data.forEach((result)=> {
          let currentArtist = {
            id: result._id,
            name: result.name,
            desc: result.desc,
            shows: result.shows
          }
          artistsFromDB.push(currentArtist)
        })
      }  
      await this.setGenresOfArtists(artistsFromDB)
    },
    setGenresOfArtists: async function(artistsFromDB){
      if(artistsFromDB){
         for(let artist of artistsFromDB){
          artist.genres = await this.getGenresOfArtistFromDB(artist.id)
        }
      }
      this.artists = artistsFromDB
    },
    getGenresOfArtistFromDB: async function(artistid){
      let genresToReturn = []
      let artistForReq = {
        artistId: artistid
      }
      const result = await GenresService.getGenresByArtist(artistForReq)
      if(result.data instanceof Array){
        result.data.forEach((doc)=>{
          genresToReturn.push(doc._id)
        })
      }
      return genresToReturn
	  },
    deleteArtistFromGenre: async function(artistid){
      let artistForReq = {
        artistId: artistid
      }
      const result = await GenresService.getGenresByArtist(artistForReq)
      if(result.data instanceof Array){
        for(let doc of result.data){
          console.log(doc)
          let artistGenre = {
            artistId: artistid,
            genreId: doc._id
          }
          console.log(artistGenre)
          await GenresService.removeArtistFromGenre(artistGenre)
        }
      }
    }    
  }, 
  mounted(){
    this.getArtistsFromMongo()
    this.setGenresOfArtists()
  }
}
</script>
<style scoped>
</style>
