/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddExamToFireBase } from '../services/mutate';
import { type TAddExamForm } from '../types/examType';
import ChooseQuestions from './ChooseQuestions';
import ExamFormat from './ExamFormat';
import ExamInformation from './ExamInformation';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Content = () => {
  const stepperRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const {
    formState: { isValid },
    handleSubmit,
  } = useFormContext<TAddExamForm>();
  const navigate = useNavigate();

  const { isPending, mutate } = useAddExamToFireBase();

  const addExam = (data: TAddExamForm) => {
    mutate(data, {
      onError: () => {
        showToast({
          detail: t`Failed to add the exam`,
          severity: 'error',
          summary: t`Error`,
        });
      },

      onSuccess: () => {
        showToast({
          detail: t`Exam has been added successfully`,
          severity: 'success',
          summary: t`Success`,
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.EXAMS_TABLE],
        });
        navigate('..');
      },
    });
  };

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
    <div className="flex flex-col h-full justify-between">
      <Stepper
        activeStep={currentStep}
        headerPosition="bottom"
        onChangeStep={(event) => setCurrentStep(event.index)}
        ref={stepperRef}
      >
        <StepperPanel header={t`Exam Information`}>
          <ExamInformation />
        </StepperPanel>
        <StepperPanel header={t`Exam Format`}>
          <ExamFormat />
        </StepperPanel>
        <StepperPanel header={t`Add Questions`}>
          <ChooseQuestions />
        </StepperPanel>
        <StepperPanel header={t`Review`} />
      </Stepper>
      <div className="flex justify-between">
        <Button
          className="mt-2"
          disabled={!(currentStep > 0) || isPending}
          icon="pi pi-arrow-left"
          iconPos="left"
          onClick={handlePrevious}
          rounded
        />
        {currentStep !== 3 && (
          <Button
            className="mt-2"
            disabled={!(currentStep < 3) || isPending}
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={handleNext}
            rounded
          />
        )}
        {currentStep === 3 && (
          <Button
            className="mt-2"
            disabled={!isValid || isPending}
            icon="pi pi-check"
            iconPos="right"
            onClick={handleSubmit(addExam)}
            rounded
            severity={isValid ? 'success' : 'danger'}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
