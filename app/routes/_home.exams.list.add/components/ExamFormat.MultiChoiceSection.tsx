import { type TAddExamForm } from '../types/examType';
import { Trans } from '@lingui/macro';
import { Checkbox } from 'primereact/checkbox';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const MultiChoiceSection = () => {
  const { clearErrors, control, resetField, setValue } =
    useFormContext<TAddExamForm>();

  const multipleChoiceWatch = useWatch({
    control,
    name: 'examFormat.multipleChoice',
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
          name="examFormat.multipleChoice.isIncluded"
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={field.value}
                inputId="mcqIncluded"
                onChange={(event) => {
                  field.onChange(event.checked);
                  if (event.checked) {
                    setValue('examFormat.multipleChoice.count', 1);
                    setValue('examFormat.multipleChoice.marksPerQuestion', 1);
                  } else {
                    resetField('examFormat.multipleChoice');
                    clearErrors('examFormat.currentFormatMarks');
                  }
                }}
              />
              <label htmlFor="mcqIncluded">
                <Trans>Multiple Choice</Trans>
              </label>
            </div>
          )}
        />
      </div>

      <div className="flex gap-5">
        <div className="p-field">
          <Controller
            control={control}
            name="examFormat.multipleChoice.count"
            render={({ field }) => (
              <InputNumber
                buttonLayout="horizontal"
                disabled={!multipleChoiceWatch.isIncluded}
                inputMode="none"
                max={100}
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
        <div className="p-field">
          <Controller
            control={control}
            name="examFormat.multipleChoice.marksPerQuestion"
            render={({ field }) => (
              <InputNumber
                buttonLayout="horizontal"
                disabled={!multipleChoiceWatch.isIncluded}
                inputId="mcqMarksPerQuestion"
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

export default MultiChoiceSection;
