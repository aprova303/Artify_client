// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvR9PjogoMaxtnfjQJVbfsMMeQNCZzb28",
  authDomain: "artify-c8029.firebaseapp.com",
  projectId: "artify-c8029",
  storageBucket: "artify-c8029.firebasestorage.app",
  messagingSenderId: "366951933776",
  appId: "1:366951933776:web:d2afc464044372771aae55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);