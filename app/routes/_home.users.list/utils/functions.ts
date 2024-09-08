import { type AddUserFormValues } from '@/routes/_home.users.list.new-user/services/types';

export const filterData = (
  data: AddUserFormValues[],
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
