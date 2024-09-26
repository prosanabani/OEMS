import { setQueryParameters, useExamListStore } from '../store';
import { useAllCoursesList } from '@/routes/_home.courses.enrolled/services/query';
import { t, Trans } from '@lingui/macro';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';

const CoursesDropDown = () => {
  const { data: AllCourses, isLoading } = useAllCoursesList();
  const queryParameters = useExamListStore((state) => state.queryParameters);

  return (
    <FloatLabel>
      <Dropdown
        className="w-20vw"
        inputId="courses-dropdown"
        loading={isLoading}
        onChange={(event) =>
          setQueryParameters({ courseId: event.target.value })
        }
        optionLabel="label"
        options={[{ label: t`All`, value: 'all' }, ...(AllCourses || [])]}
        placeholder={t`Select Course`}
        value={queryParameters.courseId}
      />
      <label htmlFor="courses-dropdown">
        <Trans>Select Course</Trans>
      </label>
    </FloatLabel>
  );
};

export default CoursesDropDown;
