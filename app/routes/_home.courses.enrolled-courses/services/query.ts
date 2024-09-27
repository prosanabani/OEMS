import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const useEnrolledCoursesList = (studentId: string) => {
  return useQuery({
    queryFn: async () => {
      const coursesCollection = collection(FirebaseDatabase, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const enrolledCourses: any[] = [];

      // Loop through each course document
      for (const courseDocument of coursesSnapshot.docs) {
        const enrolledCourseDocumentRef = doc(
          FirebaseDatabase,
          `courses/${courseDocument.id}/enrolledcourse/${studentId}`
        );

        const enrolledCourseDocument = await getDoc(enrolledCourseDocumentRef);

        // If the document exists, add the course to the result
        if (enrolledCourseDocument.exists()) {
          enrolledCourses.push({
            id: courseDocument.id,
            ...courseDocument.data(),
          });
        }
      }

      return enrolledCourses;
    },
    queryKey: [QueryKeys.STUDENT_COURSES, studentId],
  });
};
