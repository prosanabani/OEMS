import { type TFormQuestions } from '@/routes/_home.questions.list.new-question/components/Form';
import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useQuestionsByCourseId = (courseId: string) => {
  return useQuery({
    queryFn: async () => {
      const questionsRef = collection(FirebaseDatabase, 'questions');
      const questionQuery = query(
        questionsRef,
        where('courseId', '==', courseId)
      );
      const questionSnapshot = await getDocs(questionQuery);

      // Array to store all questions and AI-generated questions
      const allQuestions: Array<TFormQuestions | TQuestion> = [];

      // Collect promises for fetching AI-generated questions
      const aiFetchPromises = questionSnapshot.docs.map(
        async (questionDocument) => {
          const questionData = {
            id: questionDocument.id,
            ...questionDocument.data(),
          } as TQuestion;

          // Add the main question to the array
          allQuestions.push(questionData);

          // Fetch AI-generated questions in parallel
          const aiQuestionsRef = collection(
            FirebaseDatabase,
            'questions',
            questionDocument.id,
            'ai-generated-questions'
          );
          const aiSnapshot = await getDocs(aiQuestionsRef);

          // Add each AI-generated question to the array
          return aiSnapshot.docs.map(
            (document_) =>
              ({
                id: document_.id,
                ...document_.data(),
              }) as TFormQuestions
          );
        }
      );

      // Wait for all AI question fetches to complete
      const aiResults = await Promise.all(aiFetchPromises);

      // Flatten the AI-generated questions and add them to the main array
      for (const aiQuestions of aiResults) {
        allQuestions.push(...aiQuestions);
      }

      return allQuestions;
    },
    queryKey: ['questionsByCourseId', courseId],
  });
};
