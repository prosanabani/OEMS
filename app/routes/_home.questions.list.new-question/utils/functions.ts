import { type TFormQuestions } from '../components/Form';

export const generatePrompt = (payload?: TFormQuestions) => {
  const { question, questionAnswers, questionType } = payload || {};

  if (questionType === 'theoretical' || questionType === 'trueOrFalse') {
    return (
      'paraphrase me 5 ' +
      questionType +
      ' questions in the same language about ' +
      question +
      ' and return them in array of {question : string } format.'
    );
  }

  if (questionType === 'multipleChoice') {
    return (
      'paraphrase me 5 multipleChoice questions in the same language about ' +
      question +
      ' and shuffle this questionAnswers string ' +
      questionAnswers +
      ' in different order and return them in array of {question : string , questionAnswers : string } format.'
    );
  }

  return null;
};
