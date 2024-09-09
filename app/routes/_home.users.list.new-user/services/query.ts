import { type AddUserFormValues } from './types';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';

const useAddUser = () => {
  return useMutation({
    mutationFn: async (data: AddUserFormValues) => {
      await addDoc(collection(FirebaseDatabase, 'users'), {
        email: data.email || '',
        fullName: data.fullName || '',
        level: data.level || '',
        password: data.password,
        role: data.role || '',
        userId: data.userId || '',
      });
    },
  });
};

export default useAddUser;
