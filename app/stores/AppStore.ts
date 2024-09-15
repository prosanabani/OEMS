import { type User } from 'firebase/auth';
import { type ToastMessage } from 'primereact/toast';
import { create } from 'zustand';

type TAppStore = {
  actions: {
    setUser: (user: User | null) => void;
    showToast: (ToastMessage: ToastMessage | null) => void;
  };
  toast: ToastMessage | null;
  user: User | null;
};

const useAppStore = create<TAppStore>((set) => ({
  actions: {
    setUser: (user) => set({ user }),
    showToast: (toast) => set({ toast }),
  },
  toast: null,
  user: null,
}));

export default useAppStore;

export const { showToast, setUser } = useAppStore.getState().actions;
