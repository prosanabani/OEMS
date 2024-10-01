import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useCoursesList = (userLevel: string) => {
  return useQuery({
    queryFn: async () => {
      const coursesSnapshot = await getDocs(
        collection(FirebaseDatabase, 'courses')
      );
      // Filter out null values
      return coursesSnapshot.docs
        .map((item) => {
          const courseData = item.data();
          if (userLevel === courseData.courseLevel) {
            return {
              label: courseData.courseName, // 'label' for PrimeReact Dropdown
              value: item.id, // 'value' for PrimeReact Dropdown
            };
          }

          return null;
        })
        .filter((course) => course !== null);
    },
    queryKey: [QueryKeys.COURSES_LIST, userLevel],
  });
};

export const useAllCoursesList = () => {
  return useQuery({
    queryFn: async () => {
      const coursesSnapshot = await getDocs(
        collection(FirebaseDatabase, 'courses')
      );

      // Map the courses and prepend {label: "All", value: "all"}
      return coursesSnapshot.docs.map((item) => {
        return {
          courseName: item.data().courseName, // 'label' for PrimeReact Dropdown
          id: item.id, // 'value' for PrimeReact Dropdown
        } as { courseName: string; id: string | undefined };
      });
    },
    queryKey: [QueryKeys.All_COURSES_LIST],
  });
};
