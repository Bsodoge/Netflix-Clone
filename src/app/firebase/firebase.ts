// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsPf7oR9KiXSRqY6-9TZ5S31GWx4mX-cY",
  authDomain: "betterflix-51246.firebaseapp.com",
  projectId: "betterflix-51246",
  storageBucket: "betterflix-51246.appspot.com",
  messagingSenderId: "975285384080",
  appId: "1:975285384080:web:f8b746c45afe987252f915",
  measurementId: "G-7EZEH0TN9V",
  databaseURL: "https://betterflix-51246-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export default app;