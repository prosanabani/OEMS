import { create } from 'zustand';

type QuestionListStore = {
  SearchInput: string;
  actions: {
    setQueryParams: (queryParameters: { courseId: string }) => void;
    setSearchInput: (value: string) => void;
  };
  queryParams: { courseId: string };
};

export const useQuestionListStore = create<QuestionListStore>((set, get) => ({
  actions: {
    setQueryParams: (queryParameters) =>
      set({
        queryParams: {
          ...get().queryParams,
          ...queryParameters,
        },
      }),
    setSearchInput: (value) => set({ SearchInput: value }),
  },
  queryParams: {
    courseId: 'all',
  },
  SearchInput: '',
}));

export const { setQueryParams, setSearchInput } =
  useQuestionListStore.getState().actions;
