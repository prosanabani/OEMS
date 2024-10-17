import { cheatingLiteralMapping } from './utils/constants';
import { t } from '@lingui/macro';
import { create } from 'zustand';

type StartExamStore = {
  actions: {
    setCheatingAttempt: (
      attempt: 'tab-change' | 'ai-monitoring' | 'full-screen'
    ) => void;
  };
  cheatingAttempt: string[] | undefined;
};

export const useStartExamStore = create<StartExamStore>((set, get) => ({
  actions: {
    setCheatingAttempt: (attempt) => {
      showToast({
        detail: cheatingLiteralMapping[attempt],
        severity: 'error',
        sticky: true,
        summary: t`Cheating attempt`,
      });
      return set({
        cheatingAttempt: [...(get().cheatingAttempt || []), attempt],
      });
    },
  },
  cheatingAttempt: undefined,
}));

export const { setCheatingAttempt } = useStartExamStore.getState().actions;
