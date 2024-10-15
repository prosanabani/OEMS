/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type QuestionListStore = {
  actions: {
    setExpandedRows: (
      expandedRows:
        | Array<{ aiGeneratedQuestions: any[]; id: string }>
        | undefined
    ) => void;

    setQueryParams: (queryParameters: { courseId: string }) => void;
  };
  expandedRows: Array<{ aiGeneratedQuestions: any[]; id: string }> | undefined;
  queryParams: { courseId: string };
};

export const useQuestionListStore = create<QuestionListStore>((set, get) => ({
  actions: {
    setExpandedRows: (expandedRows) => set({ expandedRows }),
    setQueryParams: (queryParameters) =>
      set({
        queryParams: {
          ...get().queryParams,
          ...queryParameters,
        },
      }),
  },
  expandedRows: [],
  queryParams: {
    courseId: 'all',
  },
}));

export const { setExpandedRows, setQueryParams } =
  useQuestionListStore.getState().actions;
