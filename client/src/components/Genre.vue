<template>
	<v-container fluid class="stick-to-side">
		<v-layout row wrap class="stick-to-side">
			<v-layout column wrap class="stick-to-side">
				<v-layout row wrap class="stick-to-side">
					<v-flex d-inline-block class="genre-sidebar-div">
						<div class="genre-sidebar">
						</div>
					</v-flex>
					<v-flex d-inline-block>
						<h2 class="genre-class">Genre</h2>
						<h1 class="genre-name">{{name}}</h1>
					</v-flex>
				</v-layout>
			</v-layout>
		</v-layout>
		<v-layout column wrap>
			<v-flex class="genre-slider-headline">
				<h1 class="genre-slider-headline">TOP FESTIVALS</h1>
			</v-flex>
			<swiper :options="swiperOptions" ref="mySwiper" class="genre-swiper">
				<swiper-slide
					class="genre-content"
					v-for="festival in festivalsFromDB"
					:key="festival.id"
					:style="{ backgroundImage: 'url(' + festival.img + ') ' }"
					:id="festival.id">
					<v-layout align-center justify-center class="genre-transparent">
						<h2 class="genre-content-text"><b>{{festival.name}}</b></h2>
					</v-layout>		
				</swiper-slide>	
				<div class="swiper-button-prev" slot="button-prev"></div>
    			<div class="swiper-button-next" slot="button-next"></div>
			</swiper>
		</v-layout>		
		<v-layout column wrap>
			<v-flex class="genre-slider-headline">
				<h1 class="genre-slider-headline">TOP ARTISTS</h1>
			</v-flex>
			<swiper :options="swiperOptions" ref="mySwiper" class="genre-swiper">
				<swiper-slide
					class="genre-content"
					v-for="artist in artistsFromDB"
					:key="artist.id"
					:style="{ backgroundImage: 'url(' + artist.img + ') ' }"
					:id="artist.id">
					<v-layout align-center justify-center class="genre-transparent">
						<h2 class="genre-content-text"><b>{{artist.name}}</b></h2>
					</v-layout>		
				</swiper-slide>	
				<div class="swiper-button-prev" slot="button-prev"></div>
    			<div class="swiper-button-next" slot="button-next"></div>
			</swiper>
		</v-layout>
		<br>
	</v-container>			
	</div>
</template>
<script>
const firebase = require('../firebaseConfig')
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default{
	data: function(){
		return{
			id: '',
			name: '',
			desc: [],
			artists: [],
			artistsFromDB: [],
			festivalsFromDB: [],
			swiperOptions: {
				slidesPerView: 4,
				navigation: {
            		nextEl: '.swiper-button-next',
            		prevEl: '.swiper-button-prev'
          		}
			}
		}
	},
	components: {
		swiper,
		swiperSlide
	},
	mounted: function(){
			this.id = this.$route.params.id
			let docRef = firebase.firestore.collection("genres").doc(this.id)
			docRef.get().then((doc) => {
				if(doc.exists){
					this.name = doc.data().name
					this.artists = doc.data().artists
					this.festivals = doc.data().festivals
					this.getArtistsFromDB()
					this.getFestivalsFromDB()
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
			let docRef = firebase.firestore.collection("genres").doc(this.id)
			docRef.get().then((doc) => {
				if(doc.exists){
					this.name = doc.data().name
					this.artists = doc.data().artists
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
		getArtistsFromDB: function(){
			firebase.firestore.collection("artists").get().then((querySnaphot)=>{
				querySnaphot.forEach((doc)=>{
					if(this.artists.includes(doc.id)){
						let currentArtist = {
							id: doc.id,
							name: doc.data().name
						}
						if(doc.data().img){
							currentArtist.img = doc.data().img
						}
						else{
							currentArtist.img = '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
						}
						this.artistsFromDB.push(currentArtist)	
					}
				})
			}).catch(function(error){
				console.error(error)
			})
		},
		getFestivalsFromDB: function(){
			firebase.firestore.collection("festivals").get().then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					if(this.festivals.includes(doc.id)){
						let currentFestival = {
							id: doc.id,
							name: doc.data().name
						}
						if(doc.data().img){
							currentFestival.img = doc.data().img
						}
						else{
							currentFestival.img = '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
						}
						this.festivalsFromDB.push(currentFestival)
					}
				})
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
.genre-sidebar-div{
	left-margin: 0px;
	top-margin: 0px;
	left-padding: 0px;
	top-padding: 0px;
	min-width: 60px;
	max-width: 60px;
	min-height: 150px;
	max-height: 150px;
}
.genre-sidebar{
	background-color: #F06543;
	min-width: 60px;
	min-height: 128px;
}
.genre-class{
	text-align: left;
	margin-top: 20px;
	margin-left: 15px;
	font-size: 1.5rem;
}
.genre-name{
	text-align: left;
	margin-left: 15px;
	font-size: 4.5rem;
}
.genre-slider-headline{
	font-size: 3rem;
	margin-top: 20px;
	margin-bottom: 10px;
}
.genre-swiper{
	width: 100%;
}
.genre-content{
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	background-image: no-repeat center center fixed;
	min-height: 200px;

}
.genre-transparent{
	min-height: 200px;
	width: 100%;
	background: rgba(255,255,255,0.4);
}
.genre-content-text{
	text-align: center;
}
.genre-transparent:hover{
	background: #F06543;
}


</style>