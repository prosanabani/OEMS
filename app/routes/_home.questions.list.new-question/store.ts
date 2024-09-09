import { create } from 'zustand';

export type NewQuestionStore = {
  actions: {
    // submitAddNewQuestion: (payload: {}) => void;
    setGeneratedQuestions: (payload: []) => void;
    setTargetQuestionsToAdd: (questions: []) => void;
  };
  generatedQuestions: [];
  targetQuestionsToAdd: [];
};

export const useNewQuestionStore = create<NewQuestionStore>((set) => ({
  actions: {
    setGeneratedQuestions: (payload) =>
      set({
        generatedQuestions: payload,
      }),
    setTargetQuestionsToAdd: (questions) =>
      set({
        targetQuestionsToAdd: questions,
      }),
  },
  generatedQuestions: [],
  targetQuestionsToAdd: [],
}));

export const { setGeneratedQuestions, setTargetQuestionsToAdd } =
  useNewQuestionStore.getState().actions;
