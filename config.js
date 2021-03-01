import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyDF5quK2p1Bfu9ppeJlu_xT-6PwwB6rVlU",
    authDomain: "story-hub-ef061.firebaseapp.com",
    databaseURL: "https://story-hub-ef061-default-rtdb.firebaseio.com",
    projectId: "story-hub-ef061",
    storageBucket: "story-hub-ef061.appspot.com",
    messagingSenderId: "627160454567",
    appId: "1:627160454567:web:92fe3b80ffce12e5889282"
  };
  // Initialize Firebase
  if(!firebase.apps.length){firebase.initializeApp(firebaseConfig)}

  export default firebase.firestore();