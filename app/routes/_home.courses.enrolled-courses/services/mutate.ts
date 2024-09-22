import { FirebaseDatabase } from '../../../config/firebase';
import en from '@/locales/en';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

type TPayload = {
  courseId: string;
  studentId: string;
};

export const useDeleteEnrolledCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, studentId }: TPayload) => {
      // Reference to the 'enrolledCourses' subcollection of the given courseId
      const enrolledCoursesRef = collection(
        FirebaseDatabase,
        'courses',
        courseId,
        'enrolledcourse'
      );
      console.log(enrolledCoursesRef);
      // Query to find the document with the matching studentId
      const matchedStudentCourseQuery = query(
        enrolledCoursesRef,
        where('studentId', '==', studentId)
      );

      // Execute the query
      const querySnapshot = await getDocs(matchedStudentCourseQuery);

      // If there's a match, delete the document
      if (querySnapshot.empty) {
        showToast({
          detail: t`No enrolled course found for the given Student`,
          severity: 'error',
          summary: 'Error',
        });
      } else {
        const documentToDelete = querySnapshot.docs[0]; // assuming one student can only be enrolled once
        await deleteDoc(
          doc(
            FirebaseDatabase,
            'courses',
            courseId,
            'enrolledcourse',
            documentToDelete.id
          )
        );
      }
    },

    onError: () => {
      showToast({
        detail: t`Failed to delete the course.`,
        severity: 'error',
        summary: 'Error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.STUDENT_COURSES],
      });
      showToast({
        detail: t`The course has been successfully deleted.`,
        severity: 'success',
        summary: t`Course Deleted`,
      });
    },
  });
};
