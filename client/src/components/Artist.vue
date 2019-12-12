<template>
	<v-container fluid class="stick-to-side">
		<v-layout row wrap class="stick-to-side">
			<v-layout column wrap class="stick-to-side">
				<v-layout row wrap class="stick-to-side">
					<v-flex d-inline-block class="artist-sidebar-div">
						<div class="artist-sidebar">
						</div>
					</v-flex>
					<v-flex d-inline-block>
						<h2 class="artist-class">Artist</h2>
						<h1 class="artist-name">{{name}}</h1>
					</v-flex>
				</v-layout>
				<v-flex 
					class="artist-description-div stick-to-side"
					v-for="paragraph in desc"
					:key="paragraph.id">
						<p class="genre-description">{{paragraph.content}}</p>
				</v-flex>			
			</v-layout>
			<v-flex class="stick-to-side artist-img-div" lg5 md3 sm1>
				<v-img src="https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg" class="artist-image"></v-img>
			</v-flex>	
		</v-layout>
	</v-container>			
	</div>	
</template>
<script>
const firebase = require('../firebaseConfig')

export default{
	data: function(){
		return{
			id: '',
			name: '',
			desc: [],
			genres: [],
			genresFromDB: [],
			img: '',
			video: ''
		}
	},
	mounted: function(){
			this.id = this.$route.params.id
			let docRef = firebase.firestore.collection("artists").doc(this.id)
			docRef.get().then((doc) => {
				if(doc.exists){
					this.name = doc.data().name
					this.splitToParagraphs(doc.data().desc)
					this.genres = doc.data().genres
					this.getGenresFromDB()
					this.img = doc.data().img
					this.video = this.data().video
				}
				else{
					this.$router.push({ path: `../hello` })
				}
			}).catch((error)=>{
				console.error(error)
			})
	},
	watch: {
		'$route' (to, from){
			this.id = to.params.id
			let docRef = firebase.firestore.collection("artists").doc(this.id)
			docRef.get().then((doc) => {
				if(doc.exists){
					this.name = doc.data().name
					this.desc = this.splitToParagraphs(doc.data().desc)
					this.genres = doc.data().genres
					this.getGenresFromDB()
					this.img = doc.data().img
					this.video = this.data().video
				}
				else{
					this.$router.push({ path: `../to.params.id` })
				}
			}).catch((error)=>{
				console.error(error)
			})
		}
	},
	methods: {
		splitToParagraphs: function(originalText){
			let paragraphs = originalText.split('_new');
			let i
			for(i=0; i<paragraphs.length; i++){
				let paragraph = {
					id: i,
					content: paragraphs[i]
				}
				this.desc.push(paragraph)
			}
		},
		getGenresFromDB: function(){
			firebase.firestore.collection("genres").get().then((querySnaphot)=>{
				querySnaphot.forEach((doc)=>{
					if(doc.data().artists.includes(this.id)){
						let currentGenre = {
							id: doc.id,
							name: doc.data().name
						}
						this.artistsFromDB.push(currentArtist)
					}
				})
			}).catch(function(error){
				console.error(error)
			})
		}
	}
}
</script>
<style>
.stick-to-side{
	margin: 0px;
	padding: 0px;
}
.artist-img-div{
	height: 0px;
	width: 0px;
}
.artist-image{
	max-height: 400px;
	max-width: 700px;
}
.artist-sidebar-div{
	left-margin: 0px;
	top-margin: 0px;
	left-padding: 0px;
	top-padding: 0px;
	min-width: 60px;
	max-width: 60px;
	min-height: 150px;
	max-height: 150px;
}
.artist-sidebar{
	background-color: #F06543;
	min-width: 60px;
	min-height: 128px;
}
.artist-class{
	text-align: left;
	margin-top: 20px;
	margin-left: 15px;
	font-size: 1.5rem;
}
.artist-name{
	text-align: left;
	margin-left: 15px;
	font-size: 4.5rem;
}
.genre-description{
	max-width: 700px;
	text-align: left;
	margin-left: 7px;
	font-size: 1.2rem;
}
.genre-artists-headline{
	margin-top: 40px;
	font-size: 3rem;
}
.artist-container{
	margin-top: 20px;
}
.artist-description-div{
	min-height: 200px;
	margin-bottom: 20px;
	background-image: no-repeat center center fixed;
	-webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>