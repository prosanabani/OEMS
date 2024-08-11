import { TUser } from './types';

export const filterData = (data: TUser[], globalFilterValue: string) => {
  return data.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(globalFilterValue.toLowerCase())
    );
  });
};
