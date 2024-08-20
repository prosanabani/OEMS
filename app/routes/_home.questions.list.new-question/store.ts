import { create } from 'zustand';

export type NewQuestionStore = {
  actions: {
    // submitAddNewQuestion: (payload: {}) => void;
    setGeneratedQuestions: (payload: []) => void;
  };
  generatedQuestions: [];
};

export const useNewQuestionStore = create<NewQuestionStore>((set) => ({
  actions: {
    setGeneratedQuestions: (payload) =>
      set({
        generatedQuestions: payload,
      }),
  },
  generatedQuestions: [],
}));

export const { setGeneratedQuestions } = useNewQuestionStore.getState().actions;

// import { apiClient } from '@/config/apiClient';
// import { create } from 'zustand';

// export type NewQuestionStore = {
//   actions: {
//     submitAddNewQuestion: (payload: {}) => void;
//   };
// };

// export const useNewQuestionStore = create<NewQuestionStore>(() => ({
//   actions: {
//     submitAddNewQuestion: async (payload) => {
//       try {
//         const response = await apiClient.post(
//           'https://api.openai.com/v1/chat/completions',
//           {
//             messages: [
//               {
//                 content: `Generate 10 formats of this question and make the choices in different order and return them to me in a JSON object format. The format should be an array of objects, each object having a 'question' and 'choices' properties: "${payload}"`,
//                 role: 'user',
//               },
//             ],
//             model: 'gpt-4o-mini',
//           },
//           {
//             headers: {
//               Authorization: `Bearer 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 `,
//             },
//           }
//         );

//         const paraphrasedQuestions = response.data.choices[0].message.content;
//         console.log(JSON.parse(paraphrasedQuestions));
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
// }));

// export const { submitAddNewQuestion } = useNewQuestionStore.getState().actions;
