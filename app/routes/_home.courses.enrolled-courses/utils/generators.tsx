import { getCourseLevelName } from './functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const courseLevelBody = (RowData: any) => {
  return <div>{getCourseLevelName(RowData.courseLevel)} </div>;
};
