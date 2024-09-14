import { type TAddExamForm } from '../_home.exams.list.new-exam/types/examType';

export type TExamCredentials = TAddExamForm & {
  examFormat: {
    currentFormatMarks: number;
    multipleChoice: {
      count: number;
      isIncluded: boolean;
      marksPerQuestion: number;
    };
    theoretical: {
      count: number;
      isIncluded: boolean;
      marksPerQuestion: number;
    };
    trueOrFalse: {
      count: number;
      isIncluded: boolean;
      marksPerQuestion: number;
    };
  };
};

// marksPerQuestion: {
//   multipleChoice: number;
//   theoretical: number;
//   trueOrFalse: number;
// };
// multipleChoice: boolean;
// multipleChoiceCount: number | null;
// theoretical: boolean;
// theoreticalCount: number | null;
// trueOrFalse: boolean;
// trueOrFalseCount: number | null;
