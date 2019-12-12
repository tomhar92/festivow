import api from '@/services/api'

export default{
	postArtists(artist){
		return api().post('artists', artist)
	},
	getAllArtists(){
		return api().get('artists/get-all')
	},
	deleteArtist(artistid){
		return api().post('artists/delete', artistid)
	},
	updateArtist(artist){
		return api().post('artists/update', artist)
	},
	getArtist(artistid){
		return api().post('artists/get-by-id', artistid)
	}
}