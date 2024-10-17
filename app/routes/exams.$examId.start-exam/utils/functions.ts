import { type TAddExamForm } from '@/routes/_home.exams.list.add/types/examType';

export const toggleFullscreen = () => {
  const Document = document.documentElement;
  if (!document.fullscreenElement) {
    Document.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const generateTitle = (type: string) => {
  const titleLiteralMapping: {
    [key: string]: string;
  } = {
    default: '',
    multipleChoice: 'Multiple Choice Questions',
    theoretical: 'Theoretical Questions',
    trueOrFalse: 'True / False Questions',
  };

  return titleLiteralMapping[type] || titleLiteralMapping['default'];
};

export const generateQuestionsFormat = (examDetails?: TAddExamForm) => {
  return (
    Object.keys(examDetails?.examFormat || {})
      // Filter out the "currentFormatMarks" if not needed in the array
      .filter((key) => key !== 'currentFormatMarks')
      .map((key) => ({
        type: key,
        // @ts-expect-error - Ignore TS error because we know the property exists
        ...examDetails?.examFormat[key],
      }))
      .filter((item) => item.isIncluded)
  );
};

export const getRandomElement = <T>(array: T[]): T | null => {
  if (array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
