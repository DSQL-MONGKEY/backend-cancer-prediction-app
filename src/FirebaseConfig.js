// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDTOJR9kjSN5I2JldWeVpqd4dLciFNOU1I",
   authDomain: "submission-mgce-dimas-422923.firebaseapp.com",
   projectId: "submission-mgce-dimas-422923",
   storageBucket: "submission-mgce-dimas-422923.appspot.com",
   messagingSenderId: "356019753858",
   appId: "1:356019753858:web:0f11d562b6ccac2077f59b",
   measurementId: "G-95MG88LRN9"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

module.exports = { FIREBASE_APP, FIREBASE_DB }