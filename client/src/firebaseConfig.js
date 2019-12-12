import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyDieHS7yhRgV6jR63iuVjvVT4cgCQGS22w",
    authDomain: "festivow.firebaseapp.com",
    databaseURL: "https://festivow.firebaseio.com",
    projectId: "festivow",
    storageBucket: "festivow.appspot.com",
    messagingSenderId: "783869676063"
  };
firebase.initializeApp(config);

const firestore = firebase.firestore()
const auth = firebase.auth()

const firestoreSettings = {
	timestampsInSnapshots: true
}
firestore.settings(firestoreSettings)

export {
	firestore,
	auth
}