import { type TAddExamForm } from '../types/examType';
import MultiChoiceSection from './ExamFormat.MultiChoiceSection';
import TheoreticalSection from './ExamFormat.TheoreticalSection';
import TrueOrFalseSection from './ExamFormat.TrueOrFalseSection';
import { t, Trans } from '@lingui/macro';
import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ExamFormat = () => {
  // console.log(state);
  const { clearErrors, control, setError } = useFormContext<TAddExamForm>();

  const CurrentFormatMarks = 'examFormat.currentFormatMarks';

  // Watch for all exam format fields
  const examFormatWatch = useWatch({
    control,
    name: 'examFormat',
  });
  const examMarkWatch = useWatch({
    control,
    name: 'examMark',
  });

  // Destructure examFormatWatch for easier access
  const { multipleChoice, theoretical, trueOrFalse } = examFormatWatch || {};

  // Calculate total marks using useMemo to optimize performance
  const currentFormatMarks = useMemo(() => {
    let totalMarks = 0;

    if (multipleChoice?.isIncluded) {
      totalMarks +=
        (multipleChoice.count ?? 0) * (multipleChoice.marksPerQuestion ?? 0);
    }

    if (theoretical?.isIncluded) {
      totalMarks +=
        (theoretical.count ?? 0) * (theoretical.marksPerQuestion ?? 0);
    }

    if (trueOrFalse?.isIncluded) {
      totalMarks +=
        (trueOrFalse.count ?? 0) * (trueOrFalse.marksPerQuestion ?? 0);
    }

    return totalMarks;
  }, [multipleChoice, theoretical, trueOrFalse]);

  // Handle validation errors
  useEffect(() => {
    if (currentFormatMarks > examMarkWatch) {
      setError(CurrentFormatMarks, {
        message: t`Total marks (${currentFormatMarks}) exceed the exam marks (${examMarkWatch})`,
        type: 'manual',
      });
    } else if (currentFormatMarks < examMarkWatch) {
      setError(CurrentFormatMarks, {
        message: t`Total marks (${currentFormatMarks}) are less than the exam marks (${examMarkWatch})`,
        type: 'manual',
      });
    } else {
      clearErrors(CurrentFormatMarks);
    }
  }, [clearErrors, currentFormatMarks, examMarkWatch, setError]);

  return (
    <>
      <div className="p-field ">
        <ProgressBar value={(currentFormatMarks / examMarkWatch) * 100} />
        <label htmlFor="currentFormatMarks">
          {t`Current Marks: ${currentFormatMarks} / ${examMarkWatch}`}
        </label>
        {currentFormatMarks !== examMarkWatch && (
          <small className="p-error ml-2">
            <Trans>
              {currentFormatMarks > examMarkWatch
                ? 'Total marks exceed the allowed exam marks'
                : 'Total marks are less than the required exam marks'}
            </Trans>
          </small>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="columns flex items-center justify-end gap-5">
          <div className="">Number of Questions</div>
          <div className="">Marks Per Questions</div>
        </div>
        <MultiChoiceSection />
        <TheoreticalSection />
        <TrueOrFalseSection />
      </div>
    </>
  );
};

export default ExamFormat;
