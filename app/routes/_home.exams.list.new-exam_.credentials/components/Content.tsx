import { type TExamCredentials } from '../type';
import MultiChoiceSection from './Content.MultiChoiceSection';
import TheoreticalSection from './Content.TheoreticalSection';
import TrueOrFalseSection from './Content.TrueOrFalseSection';
import { t, Trans } from '@lingui/macro';
import { ProgressBar } from 'primereact/progressbar';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const Content = () => {
  const { state } = useLocation(); // assuming state.examMark is passed to this component
  const { clearErrors, control, setError } = useFormContext<TExamCredentials>();

  // Watch for all exam format fields at once
  const examFormatWatch = useWatch({
    control,
    name: 'examFormat',
  });

  // Calculate total marks using useMemo to avoid recalculating on every render
  const currentFormatMarks = useMemo(() => {
    let totalMarks = 0;

    // Calculate marks for multipleChoice
    if (examFormatWatch?.multipleChoice?.isIncluded) {
      totalMarks +=
        (examFormatWatch?.multipleChoice?.count ?? 0) *
        (examFormatWatch?.multipleChoice?.marksPerQuestion ?? 0);
    }

    // Calculate marks for theoretical
    if (examFormatWatch?.theoretical?.isIncluded) {
      totalMarks +=
        (examFormatWatch?.theoretical?.count ?? 0) *
        (examFormatWatch?.theoretical?.marksPerQuestion ?? 0);
    }

    // Calculate marks for trueOrFalse
    if (examFormatWatch?.trueOrFalse?.isIncluded) {
      totalMarks +=
        (examFormatWatch?.trueOrFalse?.count ?? 0) *
        (examFormatWatch?.trueOrFalse?.marksPerQuestion ?? 0);
    }

    return totalMarks;
  }, [examFormatWatch]);

  // Check for exceeding total marks and manage errors
  useMemo(() => {
    if (currentFormatMarks > state.examMark) {
      setError('examFormat.currentFormatMarks', {
        message: t`Total marks (${currentFormatMarks}) exceed the exam marks (${state.examMark})`,
        type: 'manual',
      });
    } else {
      clearErrors('examFormat.currentFormatMarks');
    }
  }, [currentFormatMarks, state.examMark, setError, clearErrors]);

  return (
    <>
      <div className="p-field">
        <ProgressBar value={(currentFormatMarks / state.examMark) * 100} />

        <label htmlFor="currentFormatMarks">
          {t`Current Marks : ${currentFormatMarks} / ${state.examMark} `}
        </label>
        {currentFormatMarks > state.examMark && (
          <small className="p-error">
            <Trans>Total marks exceed the allowed exam marks</Trans>
          </small>
        )}
      </div>
      <MultiChoiceSection />
      <TheoreticalSection />
      <TrueOrFalseSection />
    </>
  );
};

export default Content;
