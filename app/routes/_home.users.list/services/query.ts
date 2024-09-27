import { FirebaseDatabase } from '@/config/firebase';
import { type TUser } from '@/routes/_home.users.list.new-user/services/types';
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
          const userData: TUser = {
            email: document.data().email,
            fullName: document.data().fullName,
            id: document.id,
            password: document.data().password,
            role: document.data().role,
            // picture: document.data().picture,
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
