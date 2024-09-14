import { type TExamCredentials } from '../type';
import { useFormContext } from 'react-hook-form';

export const CalculateTotalMarks = () => {
  const { watch, setValue } = useFormContext<TExamCredentials>();
  const watchFields = watch().examFormat;
  let totalMarks = 0;

  if (watchFields.multipleChoice?.isIncluded) {
    totalMarks +=
      watchFields.multipleChoice.count *
      watchFields.multipleChoice.marksPerQuestion;
  }

  if (watchFields.theoretical?.isIncluded) {
    totalMarks +=
      watchFields.theoretical.count * watchFields.theoretical.marksPerQuestion;
  }

  if (watchFields.trueOrFalse?.isIncluded) {
    totalMarks +=
      watchFields.trueOrFalse.count * watchFields.trueOrFalse.marksPerQuestion;
  }

  setValue('examFormat.currentFormatMarks', totalMarks);
};
