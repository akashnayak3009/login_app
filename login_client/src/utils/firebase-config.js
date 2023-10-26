// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSRTBcTt4jPAfGGCzW-2YsQ7QoIqOe2XY",
  authDomain: "user-management-f8009.firebaseapp.com",
  projectId: "user-management-f8009",
  storageBucket: "user-management-f8009.appspot.com",
  messagingSenderId: "173965844370",
  appId: "1:173965844370:web:5a559aa3e236fa265aeb4b",
  measurementId: "G-BS6P0DGX7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);

