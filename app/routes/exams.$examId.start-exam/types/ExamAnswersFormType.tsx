export type TExamAnswersFormType = {
  multipleChoice: Array<{
    StudentChosenAnswer: {
      givenMark: number;
      marksPerQuestion: number;
      questionCorrectAnswer: string;
      questionId: string;
      studentAnswer: string;
    };
    parentQuestionId: string;
  }>;
  theoretical: Array<{
    StudentChosenAnswer: {
      givenMark: number;
      marksPerQuestion: number;
      questionCorrectAnswer: string;
      questionId: string;
      studentAnswer: string;
    };
    parentQuestionId: string;
  }>;
  trueOrFalse: Array<{
    StudentChosenAnswer: {
      givenMark: number;
      marksPerQuestion: number;
      questionCorrectAnswer: string;
      questionId: string;
      studentAnswer: string;
    };
    parentQuestionId: string;
  }>;
};
