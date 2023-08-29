// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOUd2jVsQKtyA57GTkZ02lpFQMh9fJ4jc",
  authDomain: "house-marketplace-app-61080.firebaseapp.com",
  projectId: "house-marketplace-app-61080",
  storageBucket: "house-marketplace-app-61080.appspot.com",
  messagingSenderId: "50383968122",
  appId: "1:50383968122:web:474c84930b77e60cbf28c3",
  measurementId: "G-LXDFRDQ3JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();