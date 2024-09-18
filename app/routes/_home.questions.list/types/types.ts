export type TQuestion = {
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
  questionType?: string;
};
export type TFirebaseQuestion = {
  aiGeneratedQuestions: TQuestion[];
  courseId: string;
  id: string;
  question: string;
  questionAnswers: string;
  questionCorrectAnswer: string;
};
