import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDK7v7mMcAeg0XVMe6AlZg-Z308snU0T0M",
    authDomain: "react-ferher-journal.firebaseapp.com",
    projectId: "react-ferher-journal",
    storageBucket: "react-ferher-journal.appspot.com",
    messagingSenderId: "634721132468",
    appId: "1:634721132468:web:d2f151c34be2feda1a5ce1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}