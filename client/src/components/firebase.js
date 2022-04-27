import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDZWjGXrEVQCMYyvchB-OKPDMdrxLc4V9A",
    authDomain: "fir-react-2c44b.firebaseapp.com",
    projectId: "fir-react-2c44b",
    storageBucket: "fir-react-2c44b.appspot.com",
    messagingSenderId: "247310699263",
    appId: "1:247310699263:web:c2a55b08a1d95782981aca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
