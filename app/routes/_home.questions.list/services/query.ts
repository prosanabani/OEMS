import { fetchQuestionWithAiGeneratedQuestions } from './api';
import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useQuestionsTable = () => {
  return useQuery({
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

          return {
            ...questionData,
            aiGeneratedQuestions: aiGeneratedQuestions.map((question) => {
              return {
                ...question,
                questionAnswers: JSON.parse(question.questionAnswers),
              };
            }),
          };
        })
      );
    },
    queryKey: [QueryKeys.QUESTIONS_TABLE],
  });
};
