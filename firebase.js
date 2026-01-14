// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vingo-food-delivery-65f1f.firebaseapp.com",
  projectId: "vingo-food-delivery-65f1f",
  storageBucket: "vingo-food-delivery-65f1f.firebasestorage.app",
  messagingSenderId: "989881146204",
  appId: "1:989881146204:web:9fe134488a88b9626dbf99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };