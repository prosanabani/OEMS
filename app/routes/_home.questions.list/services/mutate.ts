import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: async (questionId: string) => {
      const questionDocumentRef = doc(
        FirebaseDatabase,
        'questions',
        questionId
      );
      await deleteDoc(questionDocumentRef);
    },
  });
};
