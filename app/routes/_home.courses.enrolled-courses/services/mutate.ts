import { QueryKeys } from './query';
import { FirebaseDatabase } from '@/config/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

export const useDeleteCourseMutation = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      // Delete specific student from the courseEnrolledStudents subcollection
      const studentDocumentRef = doc(
        FirebaseDatabase,
        `courses/${courseId}/courseEnrolledStudents`,
        studentId
      );
      await deleteDoc(studentDocumentRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COURSES_LIST, courseId],
      });
    },
  });
};
