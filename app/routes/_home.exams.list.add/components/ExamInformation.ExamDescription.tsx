import { type TAddExamForm } from '../types/examType';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { Controller, useFormContext } from 'react-hook-form';

const ExamDescription = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TAddExamForm>();
  return (
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
                    'min-w-10vw max-h-25vh  h-15vh w-32.8vw  min-h-10vh',
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
        <small className="p-error">* {errors.examDescription.message}</small>
      )}
    </div>
  );
};

export default ExamDescription;
