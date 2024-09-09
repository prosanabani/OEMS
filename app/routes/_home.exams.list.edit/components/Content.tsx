import NameInput from './Content.NameInput';
import { type TExamList } from '@/routes/_home.exams.list/types/examListType';
import { t, Trans } from '@lingui/macro';
import { Badge } from 'primereact/badge';
import { FloatLabel } from 'primereact/floatlabel';
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const Content = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<TExamList>();

  const examMarkWatch = useWatch({ control, name: 'examMark' });

  return (
    <div className="w-50vh m-auto flex flex-col gap-7 mt-5">
      {/* Exam Name Input */}
      <NameInput />
      {/* Exam Title Input */}
      <div className="p-field">
        <Controller
          control={control}
          name="examTitle"
          render={({ field }) => (
            <FloatLabel>
              <InputText
                {...field}
                className={errors.examTitle ? 'p-invalid' : ''}
                pt={{
                  root: {
                    className: 'w-full',
                  },
                }}
              />
              <label>
                <Trans>Exam Title</Trans>
              </label>
            </FloatLabel>
          )}
          rules={{ required: t`Exam title is required` }}
        />
        {errors.examTitle && (
          <small className="p-error">{errors.examTitle.message}</small>
        )}
      </div>
      {/* Exam Description Input */}
      <div className="p-field">
        <Controller
          control={control}
          name="examDescription"
          render={({ field }) => (
            <FloatLabel>
              <InputTextarea
                {...field}
                className={errors.examDescription ? 'p-invalid' : ''}
                pt={{
                  root: {
                    className:
                      'min-w-full max-w-full max-h-25vh h-10vh min-h-10vh',
                  },
                }}
                rows={5}
              />
              <label>
                <Trans>Exam Description</Trans>
              </label>
            </FloatLabel>
          )}
          rules={{ required: t`Exam description is required` }}
        />
        {errors.examDescription && (
          <small className="p-error">{errors.examDescription.message}</small>
        )}
      </div>

      <div className="flex gap-5 justify-center ">
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
                  buttonLayout="vertical"
                  className="w-15"
                  inputMode="none"
                  max={100}
                  min={0}
                  onValueChange={(event: InputNumberValueChangeEvent) => {
                    field.onChange(event.value);
                    setValue('examPassMark', (event.value || 0) / 2);
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
                  orientation="vertical"
                  pt={{
                    root: {
                      className: 'bg-gray',
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
      </div>
    </div>
  );
};

export default Content;
