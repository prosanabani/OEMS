export type TQuestion = {
  courseId: string;
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
  questionType?: 'trueOrFalse' | 'theoretical' | 'multipleChoice';
};
export type TFirebaseQuestion = {
  aiGeneratedQuestions: TQuestion[];
  courseId: string;
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
  questionType?: 'trueOrFalse' | 'theoretical' | 'multipleChoice';
};
