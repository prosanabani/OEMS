// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCtIxnfhsdAtsISpIbIf47hAne0VbBvqDg',
  appId: '1:964587286081:web:66b2331e1028b795bfe0c0',
  authDomain: 'oems-93b28.firebaseapp.com',
  measurementId: 'G-5D4HRWMKQY',
  messagingSenderId: '964587286081',
  projectId: 'oems-93b28',
  storageBucket: 'oems-93b28.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseDatabase = getFirestore(app);
export const FirebaseAuth = getAuth();

setPersistence(FirebaseAuth, browserSessionPersistence);
