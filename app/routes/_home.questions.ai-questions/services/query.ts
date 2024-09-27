import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useAiGeneratedQuestionsData = () => {
  return useQuery({
    queryFn: async () => {
      const questionsCollectionRef = collection(FirebaseDatabase, 'questions');
      const questionsSnapshot = await getDocs(questionsCollectionRef);

      const aiQuestionsPromises = questionsSnapshot.docs.map(
        async (questionDocument) => {
          const aiGeneratedQuestionsRef = collection(
            questionDocument.ref,
            'ai-generated-questions'
          );
          const aiQuestionsSnapshot = await getDocs(aiGeneratedQuestionsRef);
          return aiQuestionsSnapshot.docs.map((document_) => ({
            id: document_.id,
            ...document_.data(),
          }));
        }
      );

      // Flatten the array of AI-generated questions from all subCollections
      const aiQuestionsArray = await Promise.all(aiQuestionsPromises);
      return aiQuestionsArray.flat(); // Flatten array of arrays
    },
    queryKey: [QueryKeys.AI_QUESTIONS],
  });
};
