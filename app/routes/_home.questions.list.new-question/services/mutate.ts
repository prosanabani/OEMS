import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type TPayload = {
  courseId: string;
  questions: TQuestion[];
};

export const useAddAiQuestionsToFirebase = () => {
  return useMutation({
    mutationFn: async ({ courseId, questions }: TPayload) => {
      // Add the first question to the `questions` collection
      const firstQuestion = questions[0];
      const questionRef = await addDoc(
        collection(FirebaseDatabase, 'questions'),
        {
          // @ts-expect-error - Ignore TS error
          courseId,
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
          // @ts-expect-error - Ignore TS error
          courseId,
          ...question,
        })
      );

      await Promise.all(subQuestions);
    },
  });
};
