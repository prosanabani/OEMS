/* eslint-disable @typescript-eslint/no-explicit-any */
import create from 'zustand';

type QuestionListStore = {
  actions: {
    setExpandedRows: (
      expandedRows:
        | Array<{ aiGeneratedQuestions: any[]; id: string }>
        | undefined
    ) => void;
  };
  expandedRows: Array<{ aiGeneratedQuestions: any[]; id: string }> | undefined;
};

export const useQuestionListStore = create<QuestionListStore>((set) => ({
  actions: {
    setExpandedRows: (expandedRows) => set({ expandedRows }),
  },
  expandedRows: [],
}));

export const { setExpandedRows } = useQuestionListStore.getState().actions;
