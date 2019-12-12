<template>
	<v-container fluid class="stick-to-side">
		<v-layout row wrap class="stick-to-side">
			<v-layout column wrap class="stick-to-side">
				<v-layout row wrap class="stick-to-side">
					<v-flex d-inline-block class="sidebar-div">
						<div class="sidebar">
						</div>
					</v-flex>
					<v-flex d-inline-block>
						<h2 class="headline-class">Search</h2>
						<h1 class="headline-value">{{value}}</h1>
					</v-flex>
				</v-layout>
			</v-layout>
		</v-layout>
		<v-layout column wrap>
			<v-flex class="slider-headline" v-if="resultsFound">
				<h1 class="slider-headline">TOP RESULTS</h1>
			</v-flex>
			<v-flex class="slider-headline" v-else>
				<h1 class="slider-headline">NO RESULTS FOUND!</h1>
			</v-flex>
			<swiper :options="swiperOptions" ref="mySwiper" class="swiper">
				<swiper-slide
					class="swiper-content"
					v-for="result in results"
					:key="result.id"
					:style="{ backgroundImage: 'url(' + result.img + ') ' }"
					:id="result.id">
					<v-layout column align-center justify-center class="swiper-transparent">
						<h3><b>{{result.type}}</b></h3>
						<h2 class="swiper-content-text"><b>{{result.name}}</b></h2>
						</v-layout>		
				</swiper-slide>	
				<div class="swiper-button-prev" slot="button-prev"></div>
    			<div class="swiper-button-next" slot="button-next"></div>
			</swiper>
		</v-layout>	
	</v-container>	
</template>
<script>
const firebase = require('../firebaseConfig')
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default{
	data: function(){
		return{
			value: '',
			user: '',
			dt: '',
			results: [],
			resultsFound: false,
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
		this.value = this.$route.params.value
		this.searchForGenres()
		this.searchForArtists()
		this.searchForFestivals()
		this.searchForVenues()
	},
	watch: {
		'$route' (to, from){
			this.value = to.params.value
			this.results = []
			this.resultsFound = false
			this.searchForGenres()
			this.searchForArtists()
			this.searchForFestivals()
			this.searchForVenues()
		}	
	},
	methods: {
		searchForGenres: function(){
			firebase.firestore.collection("genres").where("tags", "array-contains", this.value).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.id)
					let currentGenre = {
						type: "Genre",
						name: doc.data().name,
						id: doc.id,
						img: '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
					}
					this.results.push(currentGenre)
					this.resultsFound=true
				})
			})
		},
		searchForArtists: function(){
			firebase.firestore.collection("artists").where("tags", "array-contains", this.value).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.id)
					let currentArtist = {
						type: "Artist",
						name: doc.data().name,
						id: doc.id,
					}
					if(doc.data().img){
						currentArtist.img=doc.data().img
					}
					else{
						currentArtist.img= '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
					}
					this.results.push(currentArtist)
					this.resultsFound=true
				})
			})
		},
		searchForFestivals: function(){
			firebase.firestore.collection("festivals").where("tags", "array-contains", this.value).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.id)
					let currentFestival = {
						type: "Festival",
						name: doc.data().name,
						id: doc.id,
					}
					if(doc.data().img){
						currentFestival.img=doc.data().img
					}
					else{
						currentFestival.img= '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
					}
					this.results.push(currentFestival)
					this.resultsFound=true
				})
			})	

		},
		searchForVenues: function(){
			firebase.firestore.collection("venues").where("tags", "array-contains", this.value).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.id)
					let currentVenue = {
						type: "Venue",
						name: doc.data().name,
						id: doc.id,
					}
					if(doc.data().img){
						currentVenue.img=doc.data().img
					}
					else{
						currentVenue.img= '"https://www.7arti3.com/wp-content/uploads/2018/08/rock01-375x276.jpg"'
					}
					this.results.push(currentVenue)
					this.resultsFound=true
				})
			})	
		},
		saveSearchInDB: function(){
			
		}
	}

}
</script>
<style scoped>
.stick-to-side{
	margin: 0px;
	padding: 0px;
}
.sidebar-div{
	left-margin: 0px;
	top-margin: 0px;
	left-padding: 0px;
	top-padding: 0px;
	min-width: 60px;
	max-width: 60px;
	min-height: 150px;
	max-height: 150px;
}
.sidebar{
	background-color: #F06543;
	min-width: 60px;
	min-height: 128px;
}
.headline-class{
	text-align: left;
	margin-top: 20px;
	margin-left: 15px;
	font-size: 1.5rem;
}
.headline-value{
	text-align: left;
	margin-left: 15px;
	font-size: 4.5rem;
}
.slider-headline{
	font-size: 3rem;
	margin-top: 20px;
	margin-bottom: 10px;
}
.swiper{
	width: 100%;
}
.swiper-content{
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	background-image: no-repeat center center fixed;
	min-height: 200px;

}
.swiper-transparent{
	min-height: 200px;
	width: 100%;
	background: rgba(255,255,255,0.4);
}
.swiper-content-text{
	text-align: center;
}
.swiper-transparent:hover{
	background: #F06543;
}

</style>	