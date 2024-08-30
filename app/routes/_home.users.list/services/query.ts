import { FirebaseDatabase } from '@/config/firebase';
import { AddUserFormValues } from '@/routes/_home.users.list.new-user/services/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useUsersListTable = () => {
  return useQuery({
    queryFn: async () => {
      const querySnapshot = await getDocs(
        collection(FirebaseDatabase, 'users')
      );

      return await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const userData: AddUserFormValues = {
            id: document.id,
            fullName: document.data().fullName,
            role: document.data().role,
            password: document.data().password,
            picture: document.data().picture,
            ...document.data(),
          };

          return {
            ...userData,
          };
        })
      );
    },
    queryKey: [QueryKeys.USERS_TABLE],
  });
};
