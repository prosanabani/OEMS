import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useEnrolledCoursesList = (studentId: string) => {
  return useQuery({
    queryFn: async () => {
      const coursesCollection = collection(FirebaseDatabase, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const enrolledCourses: any[] = [];

      // Loop through each course document
      for (const courseDocument of coursesSnapshot.docs) {
        const enrolledCoursesStudentsCollection = collection(
          FirebaseDatabase,
          `courses/${courseDocument.id}/enrolledcourse`
        );
        const studentQuery = query(
          enrolledCoursesStudentsCollection,
          where('studentId', '==', studentId)
        );

        const enrolledSnapshot = await getDocs(studentQuery);

        // If there is a matching studentId, add the course to the result
        if (!enrolledSnapshot.empty) {
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
