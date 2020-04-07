import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKXSSplx3mIaDREe65hp0cuxGufK4Zrxk",
    authDomain: "messanger-app-2d714.firebaseapp.com",
    databaseURL: "https://messanger-app-2d714.firebaseio.com",
    projectId: "messanger-app-2d714",
    storageBucket: "messanger-app-2d714.appspot.com",
    messagingSenderId: "342899070724",
    appId: "1:342899070724:web:3cb9bad4c59574bbc6e251",
    measurementId: "G-LZFEXDRS7R"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);


export default Firebase;