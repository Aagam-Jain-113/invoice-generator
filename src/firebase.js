import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCvuSqStxBiBZHNQmsmXov6c6jbwcJY5dA",
    authDomain: "invoice-7556a.firebaseapp.com",
    projectId: "invoice-7556a",
    storageBucket: "invoice-7556a.appspot.com",
    messagingSenderId: "1041365230232",
    appId: "1:1041365230232:web:5b62bbf9185afba41ae6ed",
    measurementId: "G-FRN8KGZTY1"
});

var db = firebaseApp.firestore();

export { db };