import { type TFormQuestions } from '../components/Form';
import { generatePrompt } from '../utils/functions';
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
    queryKey: ['newQuestionData', Prompt],

    select: (
      data: Array<{ choices: string; id: number; question: string }>
    ) => {
      return {
        generatedQuestions: [
          {
            choices: payload?.questionAnswers || '',
            id: 9_999,
            question: payload?.question || '',
          },
          ...data,
        ],
        questionCorrectAnswer: payload?.questionCorrectAnswer,
        questionType: payload?.questionType,
      };
    },
  });
};

export default useNewQuestionData;
