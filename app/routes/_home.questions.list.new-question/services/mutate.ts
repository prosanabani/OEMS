import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export const useAddAiQuestionsToFirebase = () => {
  return useMutation({
    mutationFn: async (questions: TQuestion[]) => {
      // Add the first question to the `questions` collection
      const firstQuestion = questions[0];
      const questionRef = await addDoc(
        collection(FirebaseDatabase, 'questions'),
        {
          courseId: 'rBJe8PQDPAMQ0GpRuSSX',
          ...firstQuestion,
        }
      );

      // Add the remaining questions to the `ai-generated-questions` sub-collection
      const subCollectionRef = collection(
        FirebaseDatabase,
        'questions',
        questionRef.id,
        'ai-generated-questions'
      );

      const subQuestions = questions.slice(1).map((question) =>
        setDoc(doc(subCollectionRef), {
          courseId: 'rBJe8PQDPAMQ0GpRuSSX',
          ...question,
        })
      );

      await Promise.all(subQuestions);
    },
  });
};
