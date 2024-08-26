/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseDatabase } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchQuestionWithAiGeneratedQuestions = async (
  questionId: string
) => {
  const questionRef = collection(
    FirebaseDatabase,
    `questions/${questionId}/ai-generated-questions`
  );
  const answersSnapshot = await getDocs(questionRef);

  return answersSnapshot.docs.map((document: any) => ({
    id: document.id,
    ...document.data(),
  }));
};
