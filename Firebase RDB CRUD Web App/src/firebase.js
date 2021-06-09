import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDIpmocX95CGeLBOS5s7YNMpz3D1yKx80I",
    authDomain: "react-crud-8d41a.firebaseapp.com",
    databaseURL: "https://react-crud-8d41a-default-rtdb.firebaseio.com",
    projectId: "react-crud-8d41a",
    storageBucket: "react-crud-8d41a.appspot.com",
    messagingSenderId: "538278290182",
    appId: "1:538278290182:web:f973d2581f925912523487"
};

var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();