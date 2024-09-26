import { type TFirebaseQuestion } from '@/routes/_home.questions.list/types/types';

export const removeAiGeneratedQuestionsFromLastElement = (
  array: TFirebaseQuestion[]
) => {
  if (array.length > 0) {
    // Access the last element
    const lastElement = array[array.length - 1];

    // Check if the property exists and is not readonly
    if (lastElement && 'aiGeneratedQuestions' in lastElement) {
      //   @ts-expect-error - Ignore TS error because we know the property exists
      delete lastElement.aiGeneratedQuestions;
    }
  }

  return array; // return the modified array
};
