// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3khJgVUyRzLcTBAT6hOs9y_taarL34M0',
  appId: '1:823815035395:web:7e9dbb986b7893dc674c36',
  authDomain: 'oems-2024.firebaseapp.com',
  measurementId: 'G-60CB7C3172',
  messagingSenderId: '823815035395',
  projectId: 'oems-2024',
  storageBucket: 'oems-2024.appspot.com',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { analytics, app, auth };
