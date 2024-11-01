// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-738f2.firebaseapp.com",
  projectId: "real-estate-738f2",
  storageBucket: "real-estate-738f2.appspot.com",
  messagingSenderId: "1080826083850",
  appId: "1:1080826083850:web:c6c16da63e1b53fbf8fdf3",
  measurementId: "G-R8W0TSH72V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
