import { type TFormQuestions } from '../components/Form';
import { generatePrompt } from '../utils/functions';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useQuery } from '@tanstack/react-query';

const useNewQuestionData = (payload?: TFormQuestions) => {
  const Prompt = generatePrompt(payload);

  return useQuery({
    enabled: Boolean(payload?.question),
    queryFn: async () => {
      //   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APi_KEY);
      const genAI = new GoogleGenerativeAI(
        'AIzaSyAMDkXz6GiMI7KdhVm3T6i9Xc0i0mDwCEg'
      );
      const model = genAI.getGenerativeModel({
        generationConfig: {
          responseMimeType: 'application/json',
        },
        model: 'gemini-1.5-flash',
      });

      const result = await model.generateContent(Prompt || '');
      const response = result.response;
      return JSON.parse(response.text());
    },
    queryKey: [QueryKeys.NEW_QUESTION_DATA, Prompt],

    select: (
      data: Array<{ choices: string; id: number; question: string }>
    ) => {
      // add correct answer and question type to the generated questions
      const GeminiGeneratedQuestions = data.map((question) => {
        return {
          ...question,
          ...(payload?.questionCorrectAnswer
            ? { questionCorrectAnswer: payload.questionCorrectAnswer }
            : {}),
          questionType: payload?.questionType,
        };
      });

      // add the default added question to the first position
      const generatedQuestions = [
        {
          ...(payload?.questionAnswers
            ? { questionAnswers: payload.questionAnswers }
            : {}),
          ...(payload?.questionCorrectAnswer
            ? { questionCorrectAnswer: payload.questionCorrectAnswer }
            : {}),
          question: payload?.question || '',
          questionType: payload?.questionType,
        },
        ...GeminiGeneratedQuestions,
      ];

      return {
        generatedQuestions,
        questionCorrectAnswer: payload?.questionCorrectAnswer,
        questionType: payload?.questionType,
      };
    },
  });
};

export default useNewQuestionData;
