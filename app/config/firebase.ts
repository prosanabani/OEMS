import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCs-K_qANl3V9JBdc1DRXnqTFqjnCgRLyE',
  appId: '1:1017817844925:web:6223a71c47efb6d2bd3bd4',
  authDomain: 'testnew-2dffe.firebaseapp.com',
  measurementId: 'G-96DXP6Z6BP',
  messagingSenderId: '1017817844925',
  projectId: 'testnew-2dffe',
  storageBucket: 'testnew-2dffe.appspot.com',
};

const app = initializeApp(firebaseConfig);

export const NewDatabase = getFirestore(app);
