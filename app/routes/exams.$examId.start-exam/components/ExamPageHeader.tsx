import { type TExamAnswersFormType } from '../types/ExamAnswersFormType';
import aiMonitoring from '@/assets/monitoringAnimation.json';
import { t } from '@lingui/macro';
import Lottie from 'lottie-react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useFormContext } from 'react-hook-form';

const ExamPageHeader = () => {
  const {
    formState: { isValid },
    handleSubmit,
  } = useFormContext<TExamAnswersFormType>();

  return (
    <div>
      <Toolbar
        end={
          <Button
            label={t`Finish Exam`}
            onClick={
              isValid
                ? handleSubmit((FormData) => console.log(FormData))
                : () =>
                    showToast({
                      detail: t`Please make sure that all questions are answered`,
                      severity: 'error',
                    })
            }
            severity={isValid ? 'contrast' : 'danger'}
          />
        }
        start={
          <div className="">
            <Lottie
              animationData={aiMonitoring}
              className="bg-red h-15 rounded"
            />
          </div>
        }
      />
    </div>
  );
};

export default ExamPageHeader;
