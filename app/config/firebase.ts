// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtIxnfhsdAtsISpIbIf47hAne0VbBvqDg",
  authDomain: "oems-93b28.firebaseapp.com",
  projectId: "oems-93b28",
  storageBucket: "oems-93b28.appspot.com",
  messagingSenderId: "964587286081",
  appId: "1:964587286081:web:66b2331e1028b795bfe0c0",
  measurementId: "G-5D4HRWMKQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseDatabase = getFirestore(app);
