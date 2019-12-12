const firebase=require('../firebaseConfig.js')

const state = {
	currentUser: null,
	userProfile: {}
}

const actions = {
		fetchUserProfile({commit, state}, uid){
			firebase.firestore.collection("users").doc(uid).get().then((doc)=>{
				commit('setUserProfile', doc.data())
			}).catch((error)=>{
				console.error(error)
			})
		},
		logOutUser({commit, state}){
			commit('setCurrentUser', null)
			commit('setUserProfile', {})
			console.log('Logged Out In Vuex')
		}
}

const mutations = 
	{
		setCurrentUser(state, val){
			state.currentUser = val
		},
		setUserProfile(state, val){
			state.userProfile = val
		}
	}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}	
