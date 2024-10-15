/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQuestion } from '@/routes/_home.questions.list/types/types';
import { fetchQuestionWithAiGeneratedQuestion } from './apiQuestion';
import { FirebaseDatabase } from '@/config/firebase';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useAllCoursesLists = () => {
  return useQuery({
    queryFn: async () => {
      const coursesSnapshot = await getDocs(
        collection(FirebaseDatabase, 'courses')
      );

      // Map the courses and prepend {label: "All", value: "all"}
      return coursesSnapshot.docs.map((item) => {
        return {
          label: item.data().courseName, // 'label' for PrimeReact Dropdown
          value: item.id, // 'value' for PrimeReact Dropdown
        } as { label: string; value: string | undefined };
      });
    },
    queryKey: [QueryKeys.All_COURSES_LIST],
  });
};

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
            await fetchQuestionWithAiGeneratedQuestion(document.id);

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
          };
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
// // ['coursesQuestionsData', courseIds],

export const useCoursesQuestionsData = (courseIds: string[]) => {
  return useQuery({
    queryFn: async () => {
      const normalQuestionsCount: number[] = [];
      const aiQuestionsCount: number[] = [];

      for (const courseId of courseIds) {
        const questionsRef = collection(FirebaseDatabase, 'questions');
        const questionsQuery = query(
          questionsRef,
          where('courseId', '==', courseId)
        );

        const questionsSnapshot = await getDocs(questionsQuery);

        let normalCount = 0;
        let aiCount = 0;

        for (const questionDocument of questionsSnapshot.docs) {
          // Count normal questions
          normalCount++;

          // Count AI-generated questions
          const aiGeneratedRef = collection(
            questionDocument.ref,
            'ai-generated-questions'
          );
          const aiGeneratedSnapshot = await getDocs(aiGeneratedRef);

          aiCount += aiGeneratedSnapshot.size;
        }

        normalQuestionsCount.push(normalCount);
        aiQuestionsCount.push(aiCount);
      }

      return {
        aiQuestions: aiQuestionsCount,
        normalQuestions: normalQuestionsCount,
      };
    },
    queryKey: ['coursesQuestionsData', courseIds],
  });
};

export const useTotalQuestionsCount = () => {
  return useQuery({
    queryFn: async (): Promise<number[]> => {
      const questionsRef = collection(FirebaseDatabase, 'questions');
      const snapshot = await getDocs(questionsRef);

      let trueOrFalseCount = 0;
      let multipleChoiceCount = 0;
      let theoreticalCount = 0;

      for (const document_ of snapshot) {
        const data = document_.data() as TQuestion;
        if (data.questionType === 'trueOrFalse') {
          trueOrFalseCount++;
        } else if (data.questionType === 'multipleChoice') {
          multipleChoiceCount++;
        } else if (data.questionType === 'theoretical') {
          theoreticalCount++;
        }
      }

      return [trueOrFalseCount, multipleChoiceCount, theoreticalCount];
    },
    queryKey: ['totalQuestionsCount'],
  });
};
