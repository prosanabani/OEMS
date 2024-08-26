/* eslint-disable @typescript-eslint/no-explicit-any */

import PickerTab from './PickerTab';
import QuestionsTabs from './QuestionsTabs';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useFormContext } from 'react-hook-form';

const GenerateAiQuestionContent = () => {
  const stepperRef = useRef<any>(null);

  const { handleSubmit } = useFormContext();

  return (
    <Stepper
      pt={{
        panelContainer: {
          className: 'p-0',
        },
        // root: {
        //   className: 'h-75vh',
        // },
        // root: {
        //   className: 'bg-red p-0',
        // },
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
                  accept: () => stepperRef.current.prevCallback(),
                  acceptClassName: 'p-button-danger',
                  defaultFocus: 'reject',
                  draggable: false,
                  header: t` Are you sure you want to return ?`,
                  icon: 'pi pi-exclamation-triangle text-red',
                  message: (
                    <span className="p-error">
                      Generated Questions will be discarded !
                    </span>
                  ),

                  reject: () => {},
                })
              }
              severity="secondary"
            />
            <ConfirmDialog />

            <Button label={t`Add to Questions`} onClick={() => {}} />
          </div>
        </div>
      </StepperPanel>
    </Stepper>
  );
};

export default GenerateAiQuestionContent;
