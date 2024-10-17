import { create } from 'zustand';

type StartExamStore = {
  actions: {
    setCheatingAttempt: (
      attempt: 'tabChange' | 'AiMonitoring' | 'fullScreen'
    ) => void;
  };
  cheatingAttempt: string[] | undefined;
};

export const useStartExamStore = create<StartExamStore>((set, get) => ({
  actions: {
    setCheatingAttempt: (attempt) =>
      set({
        cheatingAttempt: [...(get().cheatingAttempt || []), attempt],
      }),
  },
  cheatingAttempt: undefined,
}));

export const { setCheatingAttempt } = useStartExamStore.getState().actions;
