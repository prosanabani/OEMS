import { useFullScreenMonitoring } from '../hooks/useFullScreenMonitoring';
import { type TExamAnswersFormType } from '../types/ExamAnswersFormType';
import AiMonitoring from './AiMonitoring';
import aiMonitoring from '@/assets/monitoringAnimation.json';
import { t } from '@lingui/macro';
import Lottie from 'lottie-react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useFormContext } from 'react-hook-form';

const ExamPageHeader = () => {
  const { isFullscreen, toggleFullscreen } = useFullScreenMonitoring();
  const {
    formState: { isValid },
    handleSubmit,
  } = useFormContext<TExamAnswersFormType>();

  return (
    <div>
      <Toolbar
        end={
          <div className="flex gap-4">
            <Button
              disabled={isFullscreen}
              label={isFullscreen ? t`Exit Fullscreen` : t`Go Fullscreen`}
              onClick={toggleFullscreen}
              severity={isFullscreen ? 'info' : 'danger'}
              type="button"
            />
            <AiMonitoring />
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
          </div>
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
