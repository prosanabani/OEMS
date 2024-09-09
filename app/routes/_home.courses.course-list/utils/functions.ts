import { type CourseFormValues } from '../services/types';

export const filterData = (
  data: CourseFormValues[],
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
