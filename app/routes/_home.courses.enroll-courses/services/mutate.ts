import { FirebaseDatabase } from '../../../config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

type TPayload = {
  courseId: string;
  studentId: string;
};

export const useDeleteEnrolledCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, studentId }: TPayload) => {
      // Reference to the specific enrolled course document using the studentId as the document ID
      const enrolledCourseDocumentRef = doc(
        FirebaseDatabase,
        'courses',
        courseId,
        'enrolledcourse',
        studentId
      );

      // Try deleting the document
      try {
        await deleteDoc(enrolledCourseDocumentRef);
      } catch {
        throw new Error(t`Failed to delete the course.`);
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
