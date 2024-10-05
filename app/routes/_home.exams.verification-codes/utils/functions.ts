import { type TVerificationCodeList } from './types';

export const filterData = (
  data: TVerificationCodeList[],
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

export const generateRandomCode = () =>
  Math.floor(100_000 + Math.random() * 900_000);
