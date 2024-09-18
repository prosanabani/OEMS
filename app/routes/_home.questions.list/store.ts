/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TQuestion } from './types/types';
import { create } from 'zustand';

type QuestionListStore = {
  SearchInput: string;
  actions: {
    setExpandedRows: (
      expandedRows:
        | Array<{ aiGeneratedQuestions: TQuestion[]; id: string }>
        | undefined
    ) => void;
    setQueryParams: (queryParameters: { courseId: string }) => void;
    setSearchInput: (value: string) => void;
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
    setSearchInput: (value) => set({ SearchInput: value }),
  },
  expandedRows: [],
  queryParams: {
    courseId: 'all',
  },
  SearchInput: '',
}));

export const { setExpandedRows, setQueryParams, setSearchInput } =
  useQuestionListStore.getState().actions;
