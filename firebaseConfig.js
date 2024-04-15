import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu27Xg3kksEEqSWF0rAT5c9zWI6BUXnGA",
  authDomain: "login-ecoaves.firebaseapp.com",
  projectId: "login-ecoaves",
  storageBucket: "login-ecoaves.appspot.com",
  messagingSenderId: "969661644183",
  appId: "1:969661644183:web:04989cbd4be8b107f418d2"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_STORE = getFirestore(FIREBASE_APP)