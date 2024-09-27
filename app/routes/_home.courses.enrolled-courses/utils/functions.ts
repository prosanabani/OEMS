import { t } from '@lingui/macro';

export const getCourseLevelName = (courseLevel: string) => {
  switch (courseLevel) {
    case '1':
      return t`1st Year`;
    case '2':
      return '2nd Year';
    case '3':
      return '3rd Year';
    case '4':
      return '4th Year';
    default:
      return 'Unknown';
  }
};
