// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "magic-pages-b5aca.firebaseapp.com",
  databaseURL: "https://magic-pages-b5aca-default-rtdb.firebaseio.com",
  projectId: "magic-pages-b5aca",
  storageBucket: "magic-pages-b5aca.firebasestorage.app",
  messagingSenderId: "979304729572",
  appId: "1:979304729572:web:9c9a769cca0e9b231115f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);