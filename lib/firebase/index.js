// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaX261oGm96oc9AdCTKYm8Moq28LbQ-So",
  authDomain: "finace-tracker-eec19.firebaseapp.com",
  projectId: "finace-tracker-eec19",
  storageBucket: "finace-tracker-eec19.firebasestorage.app",
  messagingSenderId: "721221302775",
  appId: "1:721221302775:web:13c6b689051b795b7c16f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
