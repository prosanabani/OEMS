import { type TQuestion } from '../types/types';
import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

export const useEditQuestion = () => {
  return useMutation({
    mutationFn: async (payload: TQuestion) => {
      const questionDocumentRef = doc(
        FirebaseDatabase,
        'questions',
        payload.id
      );
      await updateDoc(questionDocumentRef, {
        question: payload.question,
        questionAnswers: payload.questionAnswers,
        questionCorrectAnswer: payload.questionCorrectAnswer,
        questionType: payload.questionType,
      });
    },
  });
};
