// import firebase from "firebase";
import firebase from "firebase/app"; // Import only the app module
import "firebase/firestore"; // Import the Firestore module if you're using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDv_eIvTtxGogpby_SpaESEQ0-VsSYXLHA",
  authDomain: "todo-app-fd7fa.firebaseapp.com",
  projectId: "todo-app-fd7fa",
  storageBucket: "todo-app-fd7fa.appspot.com",
  messagingSenderId: "20152910573",
  appId: "1:20152910573:web:e80a9f35aa9f9f864f42e4",
  measurementId: "G-DJ1VBB2QBT",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
