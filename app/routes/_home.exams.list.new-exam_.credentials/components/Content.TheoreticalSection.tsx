import { type TExamCredentials } from '../type';
import { Trans } from '@lingui/macro';
import { Checkbox } from 'primereact/checkbox';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const TheoreticalSection = () => {
  const { state } = useLocation();
  const { control, resetField } = useFormContext<TExamCredentials>();
  const theoreticalWatch = useWatch({
    control,
    name: 'examFormat.theoretical.isIncluded',
  });
  return (
    <>
      <h4>
        <Trans>Theoretical</Trans>
      </h4>
      <div className="p-field-checkbox">
        <Controller
          control={control}
          name="examFormat.theoretical.isIncluded"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={field.value}
                inputId="theoreticalIncluded"
                onChange={(event) => {
                  field.onChange(event.checked);
                  if (!event.checked) {
                    resetField('examFormat.theoretical');
                  }
                }}
              />
              <label htmlFor="theoreticalIncluded">
                <Trans>Include Theoretical Questions</Trans>
              </label>
            </div>
          )}
        />
      </div>
      {theoreticalWatch && (
        <div className="flex flex-col gap-2 ml-10">
          <div className="p-field">
            <Controller
              control={control}
              name="examFormat.theoretical.count"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="theoreticalCount">
                    <Trans>Number of Theoretical Questions</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="theoreticalCount"
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
              name="examFormat.theoretical.marksPerQuestion"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <label htmlFor="theoreticalMarksPerQuestion">
                    <Trans>Marks per Theoretical Question</Trans>
                  </label>
                  <InputNumber
                    buttonLayout="horizontal"
                    inputId="theoreticalMarksPerQuestion"
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

export default TheoreticalSection;
