// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcLKwEHBNNl7VkpIDStxukIZI5WiSngSg",
  authDomain: "user-dashboard-7d973.firebaseapp.com",
  projectId: "user-dashboard-7d973",
  storageBucket: "user-dashboard-7d973.appspot.com",
  messagingSenderId: "651365000781",
  appId: "1:651365000781:web:6b67384aa0e7eb858a9e04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth(app)