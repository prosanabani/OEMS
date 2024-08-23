import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCtIxnfhsdAtsISpIbIf47hAne0VbBvqDg',
  appId: '1:964587286081:web:66b2331e1028b795bfe0c0',
  authDomain: 'oems-93b28.firebaseapp.com',
  measurementId: 'G-5D4HRWMKQY',
  messagingSenderId: '964587286081',
  projectId: 'oems-93b28',
  storageBucket: 'oems-93b28.appspot.com',
};

const app = initializeApp(firebaseConfig);
export const FirebaseDatabase = getFirestore(app);
