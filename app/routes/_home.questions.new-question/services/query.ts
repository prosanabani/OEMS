import { GoogleGenerativeAI } from '@google/generative-ai';
import { useQuery } from '@tanstack/react-query';
import { TFormQuestions } from '../components/Form';

const useNewQuestionData = (
  payload?: TFormQuestions,
  generateQuestion?: boolean
) => {
  // console.log(payload);
  // const question = JSON.stringify(payload);
  // console.log(payload.question);
  return useQuery({
    enabled: generateQuestion,
    queryFn: async () => {
      //   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APi_KEY);
      const genAI = new GoogleGenerativeAI(
        'AIzaSyAMDkXz6GiMI7KdhVm3T6i9Xc0i0mDwCEg'
      );
      // 'AIzaSyAMDkXz6GiMI7KdhVm3T6i9Xc0i0mDwCEg'

      const model = genAI.getGenerativeModel({
        generationConfig: {
          responseMimeType: 'application/json',
        },
        model: 'gemini-1.5-flash',
      });

      const result = await model.generateContent(payload?.question || '');
      const response = result.response;
      return JSON.parse(response.text());
    },
    queryKey: ['newQuestionData', payload?.question],
  });
};

export default useNewQuestionData;
