import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDOz95XpYErFT2vZcSP0mxHfGkkMwxeC6Q",
  authDomain: "certificate-generator-8aa63.firebaseapp.com",
  projectId: "certificate-generator-8aa63",
  storageBucket: "certificate-generator-8aa63.appspot.com",
  messagingSenderId: "760113657404",
  appId: "1:760113657404:web:235326d237121d350d7539",
  measurementId: "G-CEX5RLHVNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);