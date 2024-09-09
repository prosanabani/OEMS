import { type TAddExamForm } from '../types/examType';
import { t, Trans } from '@lingui/macro';
import { Badge } from 'primereact/badge';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const ExamMarkSliders = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<TAddExamForm>();

  const examMarkWatch = useWatch({ control, name: 'examMark' });
  return (
    <>
      {/* Exam Mark Slider */}
      <div className="p-field">
        <Controller
          control={control}
          name="examMark"
          render={({ field }) => (
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="examMark">
                <Trans>Exam Mark</Trans>
              </label>
              <InputNumber
                buttonLayout="horizontal"
                inputMode="none"
                max={100}
                min={0}
                onValueChange={(event: InputNumberValueChangeEvent) => {
                  field.onChange(event.value);
                  setValue('examPassMark', (event.value || 0) / 2);
                }}
                pt={{
                  input: {
                    root: {
                      className: 'w-12',
                    },
                  },
                }}
                showButtons
                step={5}
                value={field.value}
              />
            </div>
          )}
          rules={{
            min: {
              message: t`Exam mark must be greater than 0`,
              value: 1,
            },
          }}
        />
        {errors.examMark && (
          <small className="p-error">{errors.examMark.message}</small>
        )}
      </div>
      {/* Exam Pass Mark Slider */}
      <div className="p-field">
        <Controller
          control={control}
          name="examPassMark"
          render={({ field, fieldState }) => (
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="examPassMark">
                <Trans>Pass Mark</Trans>
              </label>
              <Slider
                {...field}
                className={fieldState.error?.message ? 'p-invalid' : ''}
                id="examPassMark"
                max={examMarkWatch - 1} // Ensure max is always less than examMark
                min={0}
                onChange={(event) => field.onChange(event.value)}
                orientation="horizontal"
                pt={{
                  root: {
                    className: 'bg-gray w-45',
                  },
                }}
                step={1}
                value={field.value}
              />
              <Badge severity="danger" value={field.value} />
            </div>
          )}
          rules={{
            min: {
              message: t`Pass mark must be greater 0`,
              value: 1,
            },
          }}
        />
        {errors.examPassMark && (
          <small className="p-error">{errors.examPassMark.message}</small>
        )}
      </div>
    </>
  );
};

export default ExamMarkSliders;
