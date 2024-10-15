import { create } from 'zustand';

type DashboardAnalyticsStore = {
  actions: {
    setSelectedCourses: (filters: string[]) => void;
  };
  selectedCourses: string[] | undefined;
};

export const useDashboardAnalyticsStore = create<DashboardAnalyticsStore>(
  (set) => ({
    actions: {
      setSelectedCourses: (filters) => set({ selectedCourses: filters }),
    },
    selectedCourses: [],
  })
);

export const { setSelectedCourses } =
  useDashboardAnalyticsStore.getState().actions;
