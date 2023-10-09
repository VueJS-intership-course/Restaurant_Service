import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBsYhazj1y-sKeng24krpe45EwI9UR1PtY",
    authDomain: "restaurant-project-dec9e.firebaseapp.com",
    projectId: "restaurant-project-dec9e",
    storageBucket: "restaurant-project-dec9e.appspot.com",
    messagingSenderId: "522703657584",
    appId: "1:522703657584:web:176a77cf505ebcfc2972b5",
    measurementId: "G-FK413PQTT5"
};


firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireAuth = firebase.auth()

const firebaseData = {
    fireStore,
    fireAuth
}


export default firebaseData