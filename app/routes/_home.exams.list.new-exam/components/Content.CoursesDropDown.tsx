import { type TAddExamForm } from '../types/examType';
import { useAllCoursesList } from '@/routes/_home.courses.enrolled/services/query';
import { t, Trans } from '@lingui/macro';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Controller, useFormContext } from 'react-hook-form';

const CoursesDropDown = () => {
  const { data: AllCourses } = useAllCoursesList();

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
          <FloatLabel>
            <Dropdown
              inputId="courses-dropdown"
              {...field}
              className={errors.courseId ? 'p-invalid' : ''}
              optionLabel="label"
              options={AllCourses}
              placeholder={t`Select Course`}
              pt={{
                root: {
                  className: 'w-full',
                },
              }}
            />
            <label htmlFor="courses-dropdown">
              <Trans>Select Course</Trans>
            </label>
          </FloatLabel>
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
