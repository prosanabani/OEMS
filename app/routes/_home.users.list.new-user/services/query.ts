import { useMutation } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { AddUserFormValues } from '../components/AddUserComponent';

const useAddUser = () => {
  return useMutation({
    mutationFn: async (data: AddUserFormValues) => {
      await addDoc(collection(FirebaseDatabase, 'users'), {
        course: data.course || '',
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
