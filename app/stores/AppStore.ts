import { type ToastMessage } from 'primereact/toast';
import { create } from 'zustand';

type TAppStore = {
  actions: {
    showToast: (ToastMessage: ToastMessage | null) => void;
  };
  toast: ToastMessage | null;
};

const useAppStore = create<TAppStore>((set) => ({
  actions: {
    showToast: (toast) => set({ toast }),
  },
  toast: null,
}));

export default useAppStore;

export const { showToast } = useAppStore.getState().actions;
