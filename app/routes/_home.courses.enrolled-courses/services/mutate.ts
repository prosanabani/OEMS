import { QueryKeys } from './query';
import { FirebaseDatabase } from '@/config/firebase';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

type TPayload = {
  courseId: string;
  studentId: string;
};

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, studentId }: TPayload) => {
      // Delete specific student from the courseEnrolledStudents subcollection
      const studentDocumentRef = doc(
        FirebaseDatabase,
        `courses/${courseId}/enrolledcourse`,
        studentId
      );
      await deleteDoc(studentDocumentRef);
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
