import api from '@/services/api'

export default{
	postGenres(genre){
		return api().post('genres', genre)
	},
	getAllGenres(){
		return api().get('genres/get-all')
	},
	deleteGenre(genreid){
		return api().post('genres/delete', genreid)
	},
	updateGenre(genre){
		return api().post('genres/update', genre)
	},
	getGenre(genreid){
		return api().post('genres/get-by-id', genreid)
	},
	addArtistToGenre(artistGenre){
		return api().post('genres/add-artist', artistGenre)
	},
	removeArtistFromGenre(artistGenre){
		return api().post('genres/remove-artist', artistGenre)		
	},
	getGenresByArtist(artistId){
		return api().post('genres/get-genres-by-artist', artistId)
	}
}