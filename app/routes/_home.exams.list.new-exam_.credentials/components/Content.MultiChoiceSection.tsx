import { type TExamCredentials } from '../type';
import { Trans } from '@lingui/macro';
import { Checkbox } from 'primereact/checkbox';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const MultiChoiceSection = () => {
  const { state } = useLocation();
  const { control, resetField } = useFormContext<TExamCredentials>();
  const multipleChoiceWatch = useWatch({
    control,
    name: 'examFormat.multipleChoice.isIncluded',
  });
  return (
    <>
      <h4>
        <Trans>Multiple Choice</Trans>
      </h4>
      <div className="p-field-checkbox">
        <Controller
          control={control}
          name="examFormat.multipleChoice.isIncluded"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={field.value}
                inputId="mcqIncluded"
                onChange={(event) => {
                  field.onChange(event.checked);
                  if (!event.checked) {
                    resetField('examFormat.multipleChoice');
                  }
                }}
              />
              <label htmlFor="mcqIncluded">
                <Trans>Include Multiple Choice Questions</Trans>
              </label>
            </div>
          )}
        />
      </div>
      {multipleChoiceWatch && (
        <div className="flex flex-col gap-2 ml-10 ">
          <div className="p-field">
            <Controller
              control={control}
              name="examFormat.multipleChoice.count"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="mcqCount">
                    <Trans>Number of Multiple Choice Questions</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="mcqCount"
                    inputMode="none"
                    max={100}
                    min={1}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                      field.onChange(event.value);
                    }}
                    showButtons
                    step={1}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>

          <div className="p-field">
            <Controller
              control={control}
              name="examFormat.multipleChoice.marksPerQuestion"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="mcqMarksPerQuestion">
                    <Trans>Marks per Multiple Choice Question</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="mcqMarksPerQuestion"
                    inputMode="none"
                    max={state.examMark}
                    min={1}
                    onValueChange={(event: InputNumberValueChangeEvent) => {
                      field.onChange(event.value);
                    }}
                    showButtons
                    step={1}
                    value={field.value}
                  />
                </div>
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MultiChoiceSection;
