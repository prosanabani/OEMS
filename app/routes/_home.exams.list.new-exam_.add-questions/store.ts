import {
  type TFirebaseQuestion,
  type TQuestion,
} from '../_home.questions.list/types/types';
import { create } from 'zustand';

type AddQuestionsToExamStore = {
  actions: {
    getSelectedQuestions: () => TQuestion[];
    setMainTableSelectedQuestions: (questions: TFirebaseQuestion[]) => void;
    setRowExpansionSelectedQuestions: (questions: TQuestion[]) => void;
  };
  mainTableSelectedQuestions: TFirebaseQuestion[];
  rowExpansionSelectedQuestions: TQuestion[];
};

export const useAddQuestionsToExamStore = create<AddQuestionsToExamStore>(
  (set, get) => ({
    actions: {
      // Combine selected questions from both tables
      getSelectedQuestions: () => {
        const { mainTableSelectedQuestions, rowExpansionSelectedQuestions } =
          get();
        return [
          ...mainTableSelectedQuestions,
          ...rowExpansionSelectedQuestions,
        ];
      },

      setMainTableSelectedQuestions: (questions) =>
        set({ mainTableSelectedQuestions: questions }),

      setRowExpansionSelectedQuestions: (questions) =>
        set({ rowExpansionSelectedQuestions: questions }),
    },
    mainTableSelectedQuestions: [],
    rowExpansionSelectedQuestions: [],
  })
);

export const {
  getSelectedQuestions,
  setMainTableSelectedQuestions,
  setRowExpansionSelectedQuestions,
} = useAddQuestionsToExamStore.getState().actions;
