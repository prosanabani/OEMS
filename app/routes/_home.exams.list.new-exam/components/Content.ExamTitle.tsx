import { type TAddExamForm } from '../types/examType';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Controller, useFormContext } from 'react-hook-form';

const ExamTitle = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TAddExamForm>();
  return (
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
  );
};

export default ExamTitle;
