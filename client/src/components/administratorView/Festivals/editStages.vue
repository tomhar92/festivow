<template>
	<v-dialog v-model="editStages" persistent max-width="800px">
		<v-card>
			<v-card-title><h2>Edit Stages - {{name}}</h2></v-card-title>
			<v-divider></v-divider>
			<br>
			<h3>Existing Stages</h3>
			<br>
			<div 
				v-for="stage in stagesObjects"
				:key="stage.id">
					<ui-collapsible @open="fillShowsInStage(stage.id)">
						<div slot="header">{{stage.name}}</div>
						<div
							v-for="show in showsInStage"
							:key="show.id"
							class="existingShows">
             					<h4>{{show.artist}} - {{show.date}}</h4>
             					<h5>Start Time: {{show.startTime}}</h5>
             					<h5>End Time: {{show.endTime}}</h5>
             					<v-btn color="primary" @click="deleteShow(stage.id, show)">Delete Show</v-btn>
						</div>
						<br>
						<v-divider></v-divider>
						<br>
						<add-show v-bind:stage-id="stage.id"></add-show>
						<br>
						<v-divider></v-divider>
						<br>
						<v-btn color="primary" @click="deleteStage(stage.id)">Delete Stage</v-btn>
					</ui-collapsible>	
			</div>
			<br>
			<v-divider></v-divider>
			<br>
			<h3>Add A New Stage</h3>
			<v-flex d-flex>
				<v-flex style="padding-left: 20px">
					<v-text-field
						v-model="stageName"
						label="Stage Name"
						:error-messages="stageNameErrors"
						@touch="$v.stageName.$touch()"
						@blur="$v.stageName.$touch()"
					/>
				</v-flex>
				<v-flex align-start>	
					<v-btn
						color="primary"
						@click="addStage">
						Add Stage
					</v-btn>
				</v-flex>	
			</v-flex>
			<br>	
			<v-divider></v-divider>
			<br>
			<v-btn
				color="primary"
				@click="close">
				Close
			</v-btn>		
		</v-card>
	</v-dialog>	
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import * as fb from 'firebase'
import addShow from '@/components/administratorView/Festivals/addShowToFestival.vue'
const firebase = require('../../../firebaseConfig.js')

export default{
	data: function(){
		return{
			name: '',
			stagesFromFestival: [],
			stagesObjects: [],
			showsInStage: [],
			stageName: '',
			editStages: true,
			addShow: false
		}
	},
	props: {
		id: String
	},
	components: {
		addShow
	},
	validations: {
		stageName: {
			required
		}
	},
	computed: {
		stageNameErrors(){
			let errors=[]
			if(!this.$v.stageName.$dirty)
				return errors
			if(!this.$v.stageName.required)
				errors.push('Stage Name is required!')
			return errors
		}
	},
	created: function(){
		let docRef = firebase.firestore.collection("festivals").doc(this.id)
		docRef.get().then((doc) => {
			if(doc.exists){
				this.name=doc.data().name
				this.stagesFromFestival=doc.data().stages
				this.stagesFromFestival.forEach((stage) => {
				let stageRef = firebase.firestore.collection("stages").doc(stage)
				stageRef.get().then((doc) => {
					let stageObject = {
						id: doc.id,
						name: doc.data().name,
						shows: doc.data().shows
					}
					this.stagesObjects.push(stageObject)
				})
			})
			}
			else{
				console.error("Doc doesn't exist!")
			}
		}).catch(function(error){
			console.error(error)
		})
	},
	methods: {
		addStage: function(){
			let stage = {
				id: this.stageName+'-'+this.id,
				name: this.stageName,
				shows: []
			}
			
			firebase.firestore.collection("stages").doc(stage.id).set(stage)
			.then(() => {
				let docRef = firebase.firestore.collection("festivals").doc(this.id)
				docRef.update({
					stages: fb.firestore.FieldValue.arrayUnion(stage.id)
				})
				alert("Stage Added Successfully!")
			}).catch((error)=>{
				console.error(error)
			})
		},
		close: function(){
			this.editStages = false
		},
		fillShowsInStage: function(stageId){
			let docRef = firebase.firestore.collection("stages").doc(stageId)
			docRef.get().then((doc)=>{
				if(doc.exists){
					this.showsInStage = doc.data().shows
				}
			}).catch((error)=>{
				console.error(error)
			})
		},
		deleteShow: function(stageId, show){
			let docRef = firebase.firestore.collection("stages").doc(stageId)
			docRef.update({
				shows: fb.firestore.FieldValue.arrayRemove(show)
			}).then(()=>{
				alert("Show Removed Successfully!")
			}).catch((error)=>{
				console.error(error)
			})
		},
		deleteStage: function(stageId){
			let docRef = firebase.firestore.collection("stages").doc(stageId)
			docRef.delete().then(()=>{
				alert("Stage Deleted Successfully!")
			}).catch((error)=>{
				console.error(error)
			})
		}
	}
}

</script>
<style>

.existingShows{
	border: 1px solid black;
	display: inline-block;
	padding: 3px;
	margin: 5px;
}	


</style>