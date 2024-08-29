import { fetchQuestionWithAiGeneratedQuestions } from './api';
import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useQuestionsTable = () => {
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
                  // questionAnswers: JSON.parse(question.questionAnswers),
                };
              })
            : [];

          return {
            ...questionData,
            aiGeneratedQuestions: parsedAiGeneratedQuestions,
          };
        })
      );
    },
    queryKey: [QueryKeys.QUESTIONS_TABLE],
  });
};
