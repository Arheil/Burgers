import firebase from "firebase/compat";
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyARSWkVwc9zuGcFb3GwSdn3Ocik2FgiGzM",

    authDomain: "hot-burgers-a50d4.firebaseapp.com",

    databaseURL: "https://hot-burgers-a50d4-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "hot-burgers-a50d4",

    storageBucket: "hot-burgers-a50d4.appspot.com",

    messagingSenderId: "306849457680",

    appId: "1:306849457680:web:c117fb9c9b4a589558cc95"

})

const databaseRef = firebaseApp.database().ref();
export const hotBurgersRef = databaseRef.child('hot-burgers');
export { firebaseApp };
export default firebase;