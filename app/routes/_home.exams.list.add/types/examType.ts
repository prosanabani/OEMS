export type TAddExamForm = {
  courseId: string | undefined;
  examDescription: string;
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
  examMark: number;
  examName: string;
  examPassMark: number;
  examQuestions: string[];
  examTitle: string;
  id?: string;
};
