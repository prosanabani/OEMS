import { getRandomElement } from '../utils/functions';
import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useGetRandomExamQuestions = (
  courseId: string,
  examsQuestions: string[]
) => {
  return useQuery({
    queryFn: async () => {
      // Step 1: Initialize an array to hold the results
      const randomAiQuestions = [];

      // Step 2: For each question ID in the examsQuestions array, retrieve the corresponding AI-generated questions
      for (const questionId of examsQuestions) {
        // Get the reference to the AI-generated questions subcollection for this specific question
        const aiQuestionsRef = collection(
          FirebaseDatabase,
          `questions/${questionId}/ai-generated-questions`
        );

        // Query to get AI-generated questions with the same courseId
        const aiQuerySnapshot = await getDocs(
          query(aiQuestionsRef, where('courseId', '==', courseId))
        );

        // Map over the documents to get the AI-generated questions
        const aiGeneratedQuestions = aiQuerySnapshot.docs.map(
          (aiQuestionDocument) =>
            ({
              id: aiQuestionDocument.id,
              ...aiQuestionDocument.data(),
            }) as TQuestion
        );

        // Step 3: Choose a random AI-generated question from the retrieved list for this specific questionId
        const randomAiQuestion = getRandomElement(aiGeneratedQuestions);

        // Step 4: Push the result (or null if no AI question was found) into the array
        randomAiQuestions.push({
          aiQuestion: randomAiQuestion,
        });
      }

      // Step 5: Return the array of random AI-generated questions
      return randomAiQuestions;
    },
    queryKey: [QueryKeys.RANDOM_EXAM_QUESTIONS, courseId, examsQuestions],
  });
};
