<template>
  <div class="Administrator">
    <br>
      <v-layout row>
        <v-flex lg-3 md-6 xs-12 class="card">
            <h2>Administrator Panel</h2>
            <hr>
            <v-layout
            row
            class="panelElement" 
            align-center
            justify-end
            v-for="element in elements"
            :key="element.title">
                <v-flex md-2 sm-2 xs-3 align-start>
                  <v-icon>{{element.icon}}</v-icon>
                </v-flex>
                <v-flex md-4 sm-4 xs-3 align-start>
                  <h3>{{element.title}}</h3>
                </v-flex>
                <v-flex md-3 sm-3 xs-3 class="panel-button" align-end>
                  <v-btn flat @click="changeStatus(element.add)">Add</v-btn>
                </v-flex>
                <v-flex md-3 sm-3 xs-3 class="panel-button" align-end>
                  <v-btn flat @click="changeStatus(element.view)">View</v-btn>
                </v-flex>  
            </v-layout>  
        </v-flex>
        <v-layout column class="info-card">
          <v-flex class="card">
            <div v-show="containerStatus === 'addUsers'">
              <h2>You Can Simply <router-link to="/signup">Sign Up</router-link></h2>
            </div>
            <div v-if="containerStatus ==='showUsers'">
             <view-users></view-users>
            </div>
            <div v-if="containerStatus ==='addGenres'">
             <add-genre></add-genre>
            </div>
            <div v-if="containerStatus ==='showGenres'">
             <view-genres></view-genres>
            </div>
            <div v-if="containerStatus === 'addArtist'">
              <add-artist></add-artist>
            </div>
            <div v-if="containerStatus === 'showArtists'">
              <view-artists></view-artists>
            </div>
            <div v-if="containerStatus === 'addVenue'">
              <add-venue></add-venue>
            </div>
            <div v-if="containerStatus ==='showVenues'">
              <view-venues></view-venues>
            </div>
            <div v-if="containerStatus == 'addFestival'">
              <add-festival></add-festival>
            </div>
            <div v-if="containerStatus ==='showFestivals'">
              <view-festivals></view-festivals>
            </div>
            <div v-if="containerStatus === 'addShow'">
              <add-show></add-show>
            </div>
            <div v-if="containerStatus === 'showShows'">
              <view-shows></view-shows>
            </div>
            <div v-if="containerStatus === 'addSlide'">
              <add-slide></add-slide>
            </div>
            <div v-if="containerStatus === 'showSlides'">
              <view-slides></view-slides>
            </div>
            <div v-if="containerStatus === 'container'">
              <h2>Welcome Administrator!</h2>
              <h4>This is where you can manage your application data</h4>
            </div>
          </v-flex>
        </v-layout>  
      </v-layout>       
  </div>
</template>

<script>
import viewUsers from '@/components/administratorView/Users/viewUsers.vue'
import addGenre from '@/components/administratorView/Genres/addGenre.vue'
import viewGenres from '@/components/administratorView/Genres/viewGenres.vue'
import addArtist from '@/components/administratorView/Artists/addArtist.vue'
import viewArtists from '@/components/administratorView/Artists/viewArtists.vue'
import addVenue from '@/components/administratorView/Venues/addVenue.vue'
import viewVenues from '@/components/administratorView/Venues/viewVenues.vue'
import addFestival from '@/components/administratorView/Festivals/addFestival.vue'
import viewFestivals from '@/components/administratorView/Festivals/viewFestivals.vue'
import addShow from '@/components/administratorView/Shows/addShow.vue'
import viewShows from '@/components/administratorView/Shows/viewShows.vue'
import addSlide from '@/components/administratorView/Slides/addSlide.vue'
import viewSlides from '@/components/administratorView/Slides/viewSlides.vue'

export default {
  name: 'Administrator',
  data () {
    return {
      elements: [
        { title: 'Users', icon: 'account_circle', view: 'showUsers', add: 'addUsers' },
        { title: 'Genres', icon: 'loyalty', view: 'showGenres', add: 'addGenres' },
        { title: 'Artists', icon: 'accessibility', view: 'showArtists', add: 'addArtist'},
        { title: 'Venues', icon: 'room', view: 'showVenues', add: 'addVenue'},
        { title: 'Festivals', icon: 'landscape', view: 'showFestivals', add: 'addFestival'},
        { title: 'Shows', icon: 'theaters', view: 'showShows', add: 'addShow'},
        { title: 'Slides', icon: 'announcement', view: 'showSlides', add: 'addSlide'}
      ],
      containerStatus: "container"
    }
  },
  methods: {
    changeStatus(value){
      this.containerStatus = value
    }
  },
  components: {
    viewUsers,
    addGenre,
    viewGenres,
    addArtist,
    viewArtists,
    addVenue,
    viewVenues,
    addFestival,
    viewFestivals,
    addShow,
    viewShows,
    addSlide,
    viewSlides
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.administrator{
  margin-top: 40px;
}
h1{
  margin-top: 30px;
  margin-bottom: 10px;
}

.card{
  background: white;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.info-card{
  margin-right: 15px;
}

.panel-button{
  width: 94px !important;
}

.panelElement{
  margin: 5px;
}
</style>