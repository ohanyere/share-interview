// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCd8MhxW6dBBkBgVjs3B-iCjPHQ7qAq7uc",
  authDomain: "share-questions.firebaseapp.com",
  projectId: "share-questions",
  storageBucket: "share-questions.firebasestorage.app",
  messagingSenderId: "632845491152",
  appId: "1:632845491152:web:f3635cc2210e0f819c37d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth  = getAuth()
export const db = getFirestore()