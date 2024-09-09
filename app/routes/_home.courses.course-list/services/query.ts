import { type CourseFormValues } from './types';
import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useCoursesListTable = () => {
  return useQuery({
    queryFn: async () => {
      const querySnapshot = await getDocs(
        collection(FirebaseDatabase, 'courses')
      );

      return await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const userData: CourseFormValues = {
            courseLevel: document.data().courseLevel,
            courseName: document.data().fullName,
            courseTeacher: document.data().courseTeacher,
            id: document.id,
            ...document.data(),
          };

          return {
            ...userData,
          };
        })
      );
    },
    queryKey: [QueryKeys.COURSES_LIST],
  });
};
