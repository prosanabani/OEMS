import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useUserRoleCounts = () => {
  return useQuery({
    queryFn: async () => {
      const usersSnapshot = await getDocs(
        collection(FirebaseDatabase, 'users')
      );

      let adminCount = 0;
      let teacherCount = 0;
      let studentCount = 0;

      for (const userDocument of usersSnapshot.docs) {
        const data = userDocument.data();
        switch (data.role) {
          case 'admin':
            adminCount++;
            break;
          case 'teacher':
            teacherCount++;
            break;
          case 'student':
            studentCount++;
            break;
          default:
            break;
        }
      }

      return {
        adminCount,
        studentCount,
        teacherCount,
      };
    },
    queryKey: [QueryKeys.USERS_TABLE],
  });
};
