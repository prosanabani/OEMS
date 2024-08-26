import { type TFirebaseQuestion } from '../types/types';

export const isRowExpandable = (rowData: TFirebaseQuestion) => {
  return rowData.aiGeneratedQuestions.length > 0;
};
