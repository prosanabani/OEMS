import { create } from 'zustand';

type CourseStore = {
  SearchInput: string;
  actions: {
    setSearchInput: (value: string) => void;
  };
};

export const useCourseListStore = create<CourseStore>((set) => ({
  actions: {
    setSearchInput: (value) => set({ SearchInput: value }),
  },

  SearchInput: '',
}));

export const { setSearchInput } = useCourseListStore.getState().actions;
