import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

export const useDeleteExam = () => {
  return useMutation({
    mutationFn: async (examId: string) => {
      // Reference to the document in the main collection
      const examDocumentRef = doc(FirebaseDatabase, 'exams', examId);

      // Check if the document exists in the main collection
      const examDocument = await getDoc(examDocumentRef);
      if (examDocument.exists()) {
        // If the document exists, delete it
        await deleteDoc(examDocumentRef);
      } else {
        showToast({
          detail: t`Failed to delete the question`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};
