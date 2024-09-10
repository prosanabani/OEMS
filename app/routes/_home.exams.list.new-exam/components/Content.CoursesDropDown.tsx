import { type TAddExamForm } from '../types/examType';
import { useCoursesList } from '@/routes/_home.courses.enrolled/services/query';
import { t } from '@lingui/macro';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useFormContext } from 'react-hook-form';

const CoursesDropDown = () => {
  const userLevel = '2';

  const { data: coursesList } = useCoursesList(userLevel);

  const {
    control,
    formState: { errors },
  } = useFormContext<TAddExamForm>();
  return (
    <Controller
      control={control}
      name="courseId"
      render={({ field }) => (
        <>
          <Dropdown
            {...field}
            className={errors.courseId ? 'p-invalid' : ''}
            optionLabel="label"
            options={coursesList}
            placeholder={t`Select Course`}
          />
          {errors.courseId && (
            <small className="p-error">{errors.courseId.message}</small>
          )}
        </>
      )}
      rules={{
        required: t`Course is required`,
      }}
    />
  );
};

export default CoursesDropDown;
