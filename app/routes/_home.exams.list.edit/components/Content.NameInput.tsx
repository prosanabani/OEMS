import { type TExamList } from '@/routes/_home.exams.list/types/examListType';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Controller, useFormContext } from 'react-hook-form';

const NameInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TExamList>();
  return (
    <div className="p-field">
      <Controller
        control={control}
        name="examName"
        render={({ field }) => (
          <FloatLabel>
            <InputText
              {...field}
              className={errors.examName ? 'p-invalid' : ''}
              pt={{
                root: {
                  className: 'w-full',
                },
              }}
            />
            <label>
              <Trans>Exam Name</Trans>
            </label>
          </FloatLabel>
        )}
        rules={{ required: t`Exam name is required` }}
      />
      {errors.examName && (
        <small className="p-error">{errors.examName.message}</small>
      )}
    </div>
  );
};

export default NameInput;
