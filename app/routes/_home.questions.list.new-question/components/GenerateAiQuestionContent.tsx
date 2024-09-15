/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAddAiQuestionsToFirebase } from '../services/mutate';
import { setTargetQuestionsToAdd, useNewQuestionStore } from '../store';
import { type TFormQuestions } from './Form';
import PickerTab from './PickerTab';
import QuestionsTabs from './QuestionsTabs';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useFormContext } from 'react-hook-form';

const GenerateAiQuestionContent = () => {
  const { state: courseId } = useLocation();

  const stepperRef = useRef<any>(null);
  const navigate = useNavigate();

  const targetQuestionsToAdd = useNewQuestionStore(
    (state) => state.targetQuestionsToAdd
  );

  const payload = {
    courseId,
    questions: targetQuestionsToAdd,
  };

  const { handleSubmit } = useFormContext<TFormQuestions>();

  const { isPending, mutate } = useAddAiQuestionsToFirebase();

  const onSubmit = () => {
    mutate(payload, {
      onError: () => {
        showToast({
          detail: t`Failed to add questions`,
          severity: 'error',
          summary: t`Error`,
        });
      },
      onSuccess: () => {
        showToast({
          detail: t`Questions added successfully`,
          severity: 'success',
          summary: t`Success`,
        });
        setTargetQuestionsToAdd([]);
        navigate('..');
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.QUESTIONS_TABLE],
        });
      },
    });
  };

  return (
    <Stepper
      pt={{
        panelContainer: {
          className: 'p-0',
        },
      }}
      ref={stepperRef}
    >
      <StepperPanel
        header={t`Question`}
        pt={{ root: { className: 'h-full p-0' } }}
      >
        <QuestionsTabs />
        <div className="flex flex-col justify-between">
          <div className="flex justify-end items-end">
            <Button
              icon="pi pi-arrow-right"
              iconPos="right"
              label={t`Generate`}
              onClick={handleSubmit(() => stepperRef.current.nextCallback())}
              type="submit"
            />
          </div>
        </div>
      </StepperPanel>
      <StepperPanel
        header={t`AI generated Questions`}
        pt={{
          root: { className: 'h-full' },
        }}
      >
        <div className="h-full flex  flex-col justify-between">
          <PickerTab />

          <div className="flex justify-end items-end gap-2">
            <Button
              icon="pi pi-arrow-left"
              label={t`Return`}
              onClick={() =>
                confirmDialog({
                  accept: () => {
                    stepperRef.current.prevCallback();
                    setTargetQuestionsToAdd([]);
                  },
                  acceptClassName: 'p-button-danger',
                  defaultFocus: 'reject',
                  draggable: false,
                  header: t` Are you sure you want to return ?`,
                  icon: 'pi pi-exclamation-triangle text-red',
                  message: (
                    <span className="p-error">
                      <Trans>Generated Questions will be discarded !</Trans>
                    </span>
                  ),

                  reject: () => {},
                })
              }
              severity="secondary"
            />
            <ConfirmDialog />

            <Button
              disabled={isPending}
              label={t`Add to Questions`}
              loading={isPending}
              onClick={onSubmit}
            />
          </div>
        </div>
      </StepperPanel>
    </Stepper>
  );
};

export default GenerateAiQuestionContent;
