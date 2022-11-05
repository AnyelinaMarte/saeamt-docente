// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB60oA66vrXa17Wz2ZOvUDDmEvFzZMUV5Y",
  authDomain: "saeamt-celeo.firebaseapp.com",
  projectId: "saeamt-celeo",
  storageBucket: "saeamt-celeo.appspot.com",
  messagingSenderId: "631850305131",
  appId: "1:631850305131:web:c646cd5675524e2a87532e",
  measurementId: "G-TVHLM6R8WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);