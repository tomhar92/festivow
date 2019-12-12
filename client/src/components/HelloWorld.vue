<template>
  <div class="hello">
   <swiper :options="swiperOptions" ref="mySwiper" class="slide-wrapper">
      <swiper-slide
        class="slide"
        v-for="slide in slides"
        :key="slide.id"
        :id="slide.id"
        :style="{ backgroundImage: 'url(' + slide.img + ')' }">
         <v-container align-content-center fill-height class="slide-container">
          <div class="slide-content">
           <v-container align-content-center fill-height>
              <v-layout column align-center justify-center>
                <h3 class="slide-headline">{{slide.headline}}</h3>
                <p class="slide-text">{{slide.desc}}</p>
                <v-btn color="primary">Find Out More</v-btn>
              </v-layout>
            </v-container>
          </div>
        </v-container>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
   </swiper>
   <br>
   <v-flex d-flex>
      <div class="card">
        <v-flex align-content-center>
          <v-icon>loyalty</v-icon>
          <br>
          <h2>Search By Genre</h2>
          <br>
          <v-combobox
            v-model="selectedGenre"
            label="Select Genre"
            :items="genreNames"
            solo>
          </v-combobox>
          <v-btn color="primary" @click="searchGenre">Search</v-btn>
        </v-flex>
      </div>  
      <div class="card">
        <v-flex align-content-center>
          <v-icon>accessibility</v-icon>
          <br>
          <h2>Search By Artist</h2>
          <br>
          <v-text-field
            v-model="artist"
            label="Search Artist"
            solo>
          </v-text-field>
          <v-btn color="primary">Search</v-btn>
        </v-flex>
      </div> 
      <div class="card">
        <v-flex align-content-center>
          <v-icon>landscape</v-icon>
          <br>
          <h2>Search By Festival</h2>
          <br>
           <v-text-field
            v-model="festival"
            label="Search Festival"
            solo>
          </v-text-field>
          <v-btn color="primary">Search</v-btn>
        </v-flex>
      </div> 
       <div class="card">
        <v-flex align-content-center>
          <v-icon>room</v-icon>
          <br>
          <h2>Search By Location</h2>
          <br>
          <v-text-field
            v-model="location"
            label="Search Loaction"
            solo>
          </v-text-field>
          <v-btn color="primary">Search</v-btn>
        </v-flex>
      </div>
    </v-flex>
    <v-flex class="bottom" align-center justify-center>
      <p>&copy; Festivow {{ new Date().getFullYear() }}</p>
    </v-flex>  
  </div>
</template>

<script>
const firebase = require('../firebaseConfig')
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'HelloWorld',
  data: function(){
    return{
      slides: [],
      genres: [],
      selectedGenre: '',
      artist: '',
      festival: '',
      location: '',
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted: function(){
    this.fillSlides()
    this.getGenresFromDB()
    
  },
  computed: {
      genreNames: function(){
        let genreNames = []
        this.genres.forEach(function(genre){
          genreNames.push(genre.name)
        })
        return genreNames
      }
  },
  methods: {
    fillSlides: function(){
      let slidesFromDB = []
      firebase.firestore.collection("slides").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let slide = {
              id: doc.id,
              headline: doc.data().headline,
              desc: doc.data().desc,
              img: doc.data().img,
              linkTo: doc.data().linkTo
            }
            slidesFromDB.push(slide)
          })
        }).catch((error) => {
          console.error(error)
        })
        this.slides = slidesFromDB
    },
    getGenresFromDB: function(){
        let genresFromDB=[]
            firebase.firestore.collection("genres").get().then(function(querySnapshot){
                  querySnapshot.forEach( function(doc) {
                      let currentGenre = {
                          id: doc.id,
                          name: doc.data().name
                      }
                      genresFromDB.push(currentGenre)
                  })
              }).catch(function(error){
                console.error(error)
              })
            this.genres = genresFromDB
      },
      searchGenre: function(){
        let genreId = 'genre-'+this.selectedGenre
        this.$router.replace({ path: `/genre/${genreId}` })
      }
  }
}  
</script>
<style>

.slide{
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 500px;
  background-image: no-repeat center center fixed;
}

.slide-wrapper{
  width: 100%;
}

.slide-headline{
  opacity: 1;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
}

.slide-text{
  opacity: 1;
  font-size: 26px;
  font-family: 'Roboto', sans-serif;
}

.slide-content{
  background:rgba(255,255,255,0.5);
  border: 1px solid black;
  width: 100%;
  height: 75%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 30px;
  padding-left: 30px;
}

.card{
  background-color: #EFB851;
  max-width: 300px;
  padding: 20px;
  margin-top: 10px;
  margin-left: 18px;
  margin-right: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
}

.bottom{
  border-top: 1px solid #475D9B;
  background-color: #F06543;
  height: 50px;
  text-decoration-color: white;
}

.swiper-pagination { 
  top: 95%; 
}
.swiper-pagination-bullet{ 
  background-color: #EFB851;

  opacity: 1;
} 
.swiper-pagination-bullet-active{ 
  background: #F06543; 
  opacity: 1; 
}
.slide-container{
  padding-top: 0px;
  margin-top: 0px;
}

.swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23black'%2F%3E%3C%2Fsvg%3E") !important;
}

.swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23black'%2F%3E%3C%2Fsvg%3E") !important;
}

</style>