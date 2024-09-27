import { type TUser } from './types';
import { useMutation } from '@tanstack/react-query';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const useAddUser = () => {
  return useMutation({
    mutationFn: async (data: TUser) => {
      // First, create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth,
        data.email,
        data.password
      );

      // Extract the created user information
      const { uid } = userCredential.user;

      // Then, store additional user data in Firestore using the UID as the document ID
      await setDoc(doc(FirebaseDatabase, 'users', uid), {
        email: data.email || '',
        fullName: data.fullName || '',
        level: data.level || '',
        password: data.password || '',
        role: data.role || '',
        userId: data.userId || '',
      });
    },
  });
};

export default useAddUser;
