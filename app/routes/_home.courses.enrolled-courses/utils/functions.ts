import { t } from '@lingui/macro';

export const getCourseLevelName = (courseLevel: string) => {
  const courseLiteralMap: { [key: string]: string } = {
    '1': t`1st Year`,
    '2': t`2nd Year`,
    '3': t`3rd Year`,
    '4': t`4th Year`,
  };

  return courseLiteralMap[courseLevel] || t`Unknown`;
};
