import { create } from 'zustand';

type UserStore = {
  SearchInput: string;
  actions: {
    setSearchInput: (value: string) => void;
  };
};

export const useUserListStore = create<UserStore>((set) => ({
  actions: {
    setSearchInput: (value) => set({ SearchInput: value }),
  },

  SearchInput: '',
}));

export const { setSearchInput } = useUserListStore.getState().actions;
