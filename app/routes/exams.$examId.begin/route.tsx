/* eslint-disable @typescript-eslint/no-explicit-any */
import ExamStructure from './components/Card.ExamStructure';
import ImportantInstructions from './components/Card.ImportantInstructions';
import { useExamDetails } from './services/query';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Controller, useForm } from 'react-hook-form';

export function Component() {
  // {/* <TensorFlowPoseMonitoring /> */}
  // {/* <OnTapMonitoring /> */}
  // {/* <FullscreenBeep /> */}

  const { examId } = useParams();
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm();
  const stepperRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { data: examDetails } = useExamDetails(examId || '');
  const handleNext = () => {
    if (currentStep < 3) {
      // There are 4 steps, so the last index is 3
      setCurrentStep((previous) => previous + 1);
      stepperRef.current.nextCallback();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((previous) => previous - 1);
      stepperRef.current.prevCallback();
    }
  };

  return (
    <Card
      className="shadow-2xl mx-20vw"
      title={t`Exam Title` + ' : ' + examDetails?.examTitle}
    >
      <form>
        <Stepper activeStep={currentStep} linear ref={stepperRef}>
          <StepperPanel header={t`Exam Details`}>
            <Message
              severity="info"
              text={
                <Trans>
                  Please note: You are being monitored by AI during the
                  examDetails to ensure a secure and fair experience. Your
                  privacy is safeguarded, and all monitoring is strictly for
                  exam integrity.
                </Trans>
              }
            />
            <Divider />
            <div className="mb-4">
              <Trans>Exam Description : </Trans> {examDetails?.examDescription}
            </div>
            <Panel header={t`Exam Format & Structure`}>
              <ExamStructure />
            </Panel>
          </StepperPanel>
          <StepperPanel header={t`Exam Instructions`}>
            <Panel header={t`Important Instructions`}>
              <ImportantInstructions />
              <div className="flex items-center gap-2 mt-3">
                <Controller
                  control={control}
                  name="agreement"
                  render={({ field, fieldState }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        invalid={fieldState.invalid}
                        {...field}
                        inputId="agreement"
                      />
                      <label
                        className={fieldState.invalid ? 'p-error' : ''}
                        htmlFor="agreement"
                      >
                        <Trans>I have read and agree to the terms</Trans>
                      </label>
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small>
                      )}
                    </div>
                  )}
                  rules={{
                    required: t`Please check the box to continue`,
                  }}
                />
              </div>
            </Panel>
          </StepperPanel>
        </Stepper>
        <div className="navigation-buttons flex justify-between">
          <Button
            className="mt-2"
            disabled={!(currentStep > 0)}
            icon="pi pi-arrow-left"
            iconPos="left"
            onClick={handlePrevious}
            rounded
          />
          {currentStep !== 1 && (
            <Button
              className="mt-2"
              disabled={!(currentStep < 1)}
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={handleNext}
              rounded
            />
          )}
          {currentStep === 1 && (
            <Button
              className="mt-2"
              icon="i-ic:twotone-content-paste-go w-5 h-5"
              iconPos="right"
              label={t`Start Exam`}
              onClick={handleSubmit(() => console.log('jchbdsjc'))}
              rounded
              severity={isValid ? 'success' : 'danger'}
            />
          )}
        </div>
      </form>
    </Card>
  );
}
