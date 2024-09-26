import { type TAddExamForm } from '../types/examType';
import { Trans } from '@lingui/macro';
import { Checkbox } from 'primereact/checkbox';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const TheoreticalSection = () => {
  const { clearErrors, control, resetField, setValue } =
    useFormContext<TAddExamForm>();

  const theoreticalWatch = useWatch({
    control,
    name: 'examFormat.theoretical',
  });
  const examMarkWatch = useWatch({
    control,
    name: 'examMark',
  });

  return (
    <div className="flex items-center justify-between">
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
                  if (event.checked) {
                    setValue('examFormat.theoretical.count', 1);
                    setValue('examFormat.theoretical.marksPerQuestion', 1);
                  } else {
                    resetField('examFormat.theoretical');
                    clearErrors('examFormat.currentFormatMarks');
                  }
                }}
              />
              <label htmlFor="theoreticalIncluded">
                <Trans>Theoretical Questions</Trans>
              </label>
            </div>
          )}
        />
      </div>

      <div className="flex gap-5">
        <div className="p-field">
          <Controller
            control={control}
            name="examFormat.theoretical.count"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <InputNumber
                  buttonLayout="horizontal"
                  disabled={!theoreticalWatch.isIncluded}
                  inputMode="none"
                  max={100}
                  min={0}
                  onValueChange={(event: InputNumberValueChangeEvent) => {
                    field.onChange(event.value);
                  }}
                  pt={{
                    input: {
                      root: {
                        className: 'w-12',
                      },
                    },
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
              <InputNumber
                buttonLayout="horizontal"
                disabled={!theoreticalWatch.isIncluded}
                inputId="theoreticalMarksPerQuestion"
                inputMode="none"
                max={examMarkWatch}
                min={0}
                onValueChange={(event: InputNumberValueChangeEvent) =>
                  field.onChange(event.value)
                }
                pt={{
                  input: {
                    root: {
                      className: 'w-12',
                    },
                  },
                }}
                showButtons
                step={1}
                value={field.value}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TheoreticalSection;
