import { type TExamCredentials } from '../type';
import { Trans } from '@lingui/macro';
import { Checkbox } from 'primereact/checkbox';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const TrueOrFalseSection = () => {
  const { state } = useLocation();
  const { control, resetField } = useFormContext<TExamCredentials>();
  const trueOrFalseWatch = useWatch({
    control,
    name: 'examFormat.trueOrFalse.isIncluded',
  });
  return (
    <>
      <h4>
        <Trans>True or False</Trans>
      </h4>
      <div className="p-field-checkbox">
        <Controller
          control={control}
          name="examFormat.trueOrFalse.isIncluded"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={field.value}
                inputId="tfIncluded"
                onChange={(event) => {
                  field.onChange(event.checked);
                  if (!event.checked) {
                    resetField('examFormat.trueOrFalse');
                  }
                }}
              />
              <label htmlFor="tfIncluded">
                <Trans>Include True/False Questions</Trans>
              </label>
            </div>
          )}
        />
      </div>
      {trueOrFalseWatch && (
        <div className="flex flex-col gap-2 ml-10">
          <div className="p-field">
            <Controller
              control={control}
              name="examFormat.trueOrFalse.count"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="tfCount">
                    <Trans>Number of True/False Questions</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="tfCount"
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
              name="examFormat.trueOrFalse.marksPerQuestion"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="tfMarksPerQuestion">
                    <Trans>Marks per True/False Question</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="tfMarksPerQuestion"
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

export default TrueOrFalseSection;
