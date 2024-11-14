// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Ra52Gqe5oFMK-SCA7i7cIbHL9kNjTWI",
  authDomain: "try-to-learn-7d1b1.firebaseapp.com",
  projectId: "try-to-learn-7d1b1",
  storageBucket: "try-to-learn-7d1b1.firebasestorage.app",
  messagingSenderId: "784661776242",
  appId: "1:784661776242:web:4e18bd266dc2b3cd18ffeb",
 // databaseURL: "https://try-to-learn-7d1b1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);