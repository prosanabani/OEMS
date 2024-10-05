import { create } from 'zustand';

type ExamListStore = {
  SearchInput: string;
  actions: {
    setQueryParameters: (queryParameters: { courseId: string }) => void;
    setSearchInput: (value: string) => void;
  };
  queryParameters: { courseId: string | undefined };
};

export const useExamListStore = create<ExamListStore>((set, get) => ({
  actions: {
    setQueryParameters: (queryParameters) =>
      set({
        queryParameters: {
          ...get().queryParameters,
          ...queryParameters,
        },
      }),
    setSearchInput: (value) => set({ SearchInput: value }),
  },
  queryParameters: {
    courseId: undefined,
  },
  SearchInput: '',
}));

export const { setQueryParameters, setSearchInput } =
  useExamListStore.getState().actions;
