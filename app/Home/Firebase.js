// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZQQJ4js0UgatDVopYle_iELA0YFZXksc",
  authDomain: "emoody-23c95.firebaseapp.com",
  projectId: "emoody-23c95",
  storageBucket: "emoody-23c95.appspot.com",
  messagingSenderId: "1025555576760",
  appId: "1:1025555576760:web:fb71a217e92191d642414d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);