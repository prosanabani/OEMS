import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useUserInfo = () => {
  return useQuery({
    queryFn: async () => {
      const usersRef = collection(FirebaseDatabase, 'users');
      const getUserQuery = query(
        usersRef,
        where('email', '==', FirebaseAuth.currentUser?.email)
      );

      const querySnapshot = await getDocs(getUserQuery);
      if (querySnapshot.empty) {
        showToast({
          detail: t`User not found`,
          severity: 'error',
          summary: t`Error`,
        });
      }

      const userData = querySnapshot.docs[0].data();
      return { id: querySnapshot.docs[0].id, ...userData };
    },
    queryKey: [QueryKeys.USER_INFO],
  });
};
