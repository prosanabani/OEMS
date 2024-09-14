/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TFirebaseQuestion } from '../types/types';
import { fetchQuestionWithAiGeneratedQuestions } from './api';
import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useQuestionsTable = (courseId: string | 'all') => {
  return useQuery({
    // placeholderData: keepPreviousData,
    queryFn: async () => {
      const querySnapshot = await getDocs(
        collection(FirebaseDatabase, 'questions')
      );

      return await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const questionData = {
            id: document.id,
            ...document.data(),
          };
          const aiGeneratedQuestions =
            await fetchQuestionWithAiGeneratedQuestions(document.id);

          // Ensure aiGeneratedQuestions is not undefined
          const parsedAiGeneratedQuestions = aiGeneratedQuestions
            ? aiGeneratedQuestions.map((question) => {
                return {
                  ...question,
                };
              })
            : [];

          return {
            ...questionData,
            aiGeneratedQuestions: parsedAiGeneratedQuestions,
          } as TFirebaseQuestion;
        })
      );
    },
    queryKey: [QueryKeys.QUESTIONS_TABLE],
    select(data) {
      if (courseId === 'all') return data;
      return data.filter((question: any) => question.courseId === courseId);
    },
  });
};
