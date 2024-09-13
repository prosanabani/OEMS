import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useEnrolledCoursesList = (courseId: string) => {
  return useQuery({
    queryFn: async () => {
      // Fetch courseEnrolledStudents subcollection inside the specific course
      const enrolledStudentsSnapshot = await getDocs(
        collection(
          FirebaseDatabase,
          `courses/${courseId}/courseEnrolledStudents`
        )
      );

      return enrolledStudentsSnapshot.docs.map((document_) => ({
        label: document_.data().studentName, // Assuming you store studentName
        value: document_.id, // Student document ID
      }));
    },
    queryKey: [QueryKeys.COURSES_LIST, courseId], // Include courseId in the query key to refetch data when the courseId changes
  });
};

export { QueryKeys } from '@/utils/constants/QueryEnums';
