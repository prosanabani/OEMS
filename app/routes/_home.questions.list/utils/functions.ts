import { type TFirebaseQuestion } from '../types/types';

export const isRowExpandable = (rowData: TFirebaseQuestion) => {
  return rowData?.aiGeneratedQuestions?.length > 0;
};

export const filterData = (
  data: TFirebaseQuestion[],
  globalFilterValue: string
) => {
  return data.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(globalFilterValue.toLowerCase())
    );
  });
};
