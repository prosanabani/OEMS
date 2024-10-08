import { type TUser } from './types';
import { useMutation } from '@tanstack/react-query';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const useAddUser = () => {
  return useMutation({
    mutationFn: async (data: TUser) => {
      // Check if a user with the same userId already exists in Firestore
      const usersRef = collection(FirebaseDatabase, 'users');
      const userQuery = query(usersRef, where('userId', '==', data.userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        throw new Error('User ID already exists. Please use a different ID.');
      }

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        data.email,
        data.password
      );

      // Extract the created user information
      const { uid } = userCredential.user;

      // Store additional user data in Firestore using the UID as the document ID
      await setDoc(doc(FirebaseDatabase, 'users', uid), {
        email: data.email || '',
        fullName: data.fullName || '',
        level: data.level || '',
        password: data.password || '',
        role: data.role || '',
        userId: data.userId || '',
      });
    },
    onError: () =>
      showToast({
        detail: `Failed to update the`,
        severity: 'error',
        summary: `Error`,
      }),
  });
};

export default useAddUser;
