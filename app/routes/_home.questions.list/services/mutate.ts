import { type TQuestion } from '../types/types';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: async (questionId: string) => {
      // Reference to the document in the main collection
      const questionDocumentRef = doc(
        FirebaseDatabase,
        'questions',
        questionId
      );

      // Check if the document exists in the main collection
      const questionDocument = await getDoc(questionDocumentRef);
      if (questionDocument.exists()) {
        // If the document exists, delete it
        await deleteDoc(questionDocumentRef);
      } else {
        // If not, search in the sub-collections
        const questionsCollectionRef = collection(
          FirebaseDatabase,
          'questions'
        );
        const questionsSnapshot = await getDocs(questionsCollectionRef);

        for (const question of questionsSnapshot.docs) {
          // Reference to the sub-collection
          const aiGeneratedQuestionsCollectionRef = collection(
            question.ref,
            'ai-generated-questions'
          );
          const aiGeneratedQuestionsSnapshot = await getDocs(
            aiGeneratedQuestionsCollectionRef
          );

          for (const aiGeneratedQuestion of aiGeneratedQuestionsSnapshot.docs) {
            if (aiGeneratedQuestion.id === questionId) {
              // If the document is found in the sub-collection, delete it
              await deleteDoc(aiGeneratedQuestion.ref);
              return;
            }
          }
        }

        showToast({
          detail: t`Failed to delete the question`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};

export const useEditQuestion = () => {
  return useMutation({
    mutationFn: async (payload: TQuestion) => {
      // Reference to the document in the main collection
      const questionDocumentRef = doc(
        FirebaseDatabase,
        'questions',
        payload.id
      );

      // Check if the document exists in the main collection
      const questionDocument = await getDoc(questionDocumentRef);
      if (questionDocument.exists()) {
        // If the document exists, update it
        await updateDoc(questionDocumentRef, {
          question: payload.question,
          questionAnswers: payload.questionAnswers,
          questionCorrectAnswer: payload.questionCorrectAnswer,
          questionType: payload.questionType,
        });
      } else {
        // If not, search in the sub-collections
        const questionsCollectionRef = collection(
          FirebaseDatabase,
          'questions'
        );
        const questionsSnapshot = await getDocs(questionsCollectionRef);

        for (const question of questionsSnapshot.docs) {
          // Reference to the sub-collection
          const aiGeneratedQuestionsCollectionRef = collection(
            question.ref,
            'ai-generated-questions'
          );
          const aiGeneratedQuestionsSnapshot = await getDocs(
            aiGeneratedQuestionsCollectionRef
          );

          for (const aiGeneratedQuestion of aiGeneratedQuestionsSnapshot.docs) {
            if (aiGeneratedQuestion.id === payload.id) {
              // If the document is found in the sub-collection, update it
              await updateDoc(aiGeneratedQuestion.ref, {
                question: payload.question,
                questionAnswers: payload.questionAnswers,
                questionCorrectAnswer: payload.questionCorrectAnswer,
                questionType: payload.questionType,
              });
              return;
            }
          }
        }

        showToast({
          detail: t`Failed to update the question`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};
