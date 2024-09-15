import { type TExamCredentials } from '../type';
import MultiChoiceSection from './Content.MultiChoiceSection';
import TheoreticalSection from './Content.TheoreticalSection';
import TrueOrFalseSection from './Content.TrueOrFalseSection';
import { t, Trans } from '@lingui/macro';
import { ProgressBar } from 'primereact/progressbar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const Content = () => {
  const { state } = useLocation(); // assuming state.examMark is passed to this component
  const { clearErrors, control, setError } = useFormContext<TExamCredentials>();

  const CurrentFormatMarks = 'examFormat.currentFormatMarks';

  // Watch for all exam format fields
  const examFormatWatch = useWatch({
    control,
    name: 'examFormat',
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
    if (currentFormatMarks > state.examMark) {
      setError(CurrentFormatMarks, {
        message: t`Total marks (${currentFormatMarks}) exceed the exam marks (${state.examMark})`,
        type: 'manual',
      });
    } else if (currentFormatMarks < state.examMark) {
      setError(CurrentFormatMarks, {
        message: t`Total marks (${currentFormatMarks}) are less than the exam marks (${state.examMark})`,
        type: 'manual',
      });
    } else {
      clearErrors(CurrentFormatMarks);
    }
  }, [currentFormatMarks, state.examMark, setError, clearErrors]);

  return (
    <>
      <div className="p-field">
        <ProgressBar value={(currentFormatMarks / state.examMark) * 100} />
        <label htmlFor="currentFormatMarks">
          {t`Current Marks: ${currentFormatMarks} / ${state.examMark}`}
        </label>
        {currentFormatMarks !== state.examMark && (
          <small className="p-error ml-2">
            <Trans>
              {currentFormatMarks > state.examMark
                ? 'Total marks exceed the allowed exam marks'
                : 'Total marks are less than the required exam marks'}
            </Trans>
          </small>
        )}
      </div>
      <ScrollPanel
        pt={{
          barY: {
            className: 'bg-blue',
          },
          root: {
            className: 'h-57vh',
          },
        }}
      >
        <MultiChoiceSection />
        <TheoreticalSection />
        <TrueOrFalseSection />
      </ScrollPanel>
    </>
  );
};

export default Content;
