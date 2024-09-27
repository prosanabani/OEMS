import { type TAddExamForm } from '@/routes/_home.exams.list.add/types/examType';

export const filterData = (data: TAddExamForm[], globalFilterValue: string) => {
  return data.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(globalFilterValue.toLowerCase())
    );
  });
};
