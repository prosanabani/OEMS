export type TQuestion = {
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
};
export type TFirebaseQuestion = {
  aiGeneratedQuestions: TQuestion[];
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
};