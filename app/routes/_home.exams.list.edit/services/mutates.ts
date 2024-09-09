import { type TExamList } from '@/routes/_home.exams.list/types/examListType';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const useEditExam = () => {
  return useMutation({
    mutationFn: async (payload: TExamList) => {
      // Reference to the document in the main collection
      const examDocumentRef = doc(FirebaseDatabase, 'exams', payload.id);

      // Check if the document exists in the main collection
      const examDocument = await getDoc(examDocumentRef);
      if (examDocument.exists()) {
        // If the document exists, update it
        await updateDoc(examDocumentRef, {
          examDescription: payload.examDescription,
          examMark: payload.examMark,
          examName: payload.examName,
          examPassMark: payload.examPassMark,
          examTitle: payload.examTitle,
        });
      } else {
        showToast({
          detail: t`Failed to update the exam`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};
