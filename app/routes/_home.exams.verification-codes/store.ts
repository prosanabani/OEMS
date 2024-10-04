import { create } from 'zustand';

type VerificationCodeListStore = {
  SearchInput: string;
  actions: {
    setQueryParameters: (queryParameters: { courseId: string }) => void;
    setSearchInput: (value: string) => void;
  };
  queryParameters: { courseId: string | undefined };
};

export const useVerificationCodeListStore = create<VerificationCodeListStore>((set, get) => ({
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
  useVerificationCodeListStore.getState().actions;
