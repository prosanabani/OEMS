import { type TFormQuestions } from '../components/Form';

export const generatePrompt = (payload?: TFormQuestions) => {
  const { question, answers, questionType } = payload || {};

  if (questionType === 'theoretical' || questionType === 'trueOrFalse') {
    return (
      'paraphrase me 5 questions about ' +
      question +
      ' and return them in array of {question : string , id : number } format.'
    );
  }

  if (questionType === 'multipleChoice') {
    return (
      'paraphrase me 5 questions about ' +
      question +
      ' and make these choices  ' +
      answers +
      'in different order and return them in array of {question : string , id : number , choices : string } format.'
    );
  }

  return null;
};
