import { setQueryParameters, useExamListStore } from '../store';
import { useAllCoursesList } from '@/routes/_home.courses.enroll/services/query';
import { useEnrolledCoursesList } from '@/routes/_home.courses.enrolled-courses/services/query';
import { useUserInfo } from '@/services/userQueries';
import { t, Trans } from '@lingui/macro';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';

const CoursesDropDown = () => {
  const { data: userInfo, isLoading: infoLoading } = useUserInfo();
  const { data: AllCourses, isLoading: allCoursesLoading } =
    useAllCoursesList();
  const { data: userCourses, isLoading: coursesLoading } =
    useEnrolledCoursesList(userInfo?.id || '');

  const queryParameters = useExamListStore((state) => state.queryParameters);

  const coursesOptions =
    userInfo?.role === 'student'
      ? userCourses
      : [{ courseName: t`All`, id: 'all' }, ...(AllCourses || [])];

  return (
    <FloatLabel>
      <Dropdown
        checkmark
        className="w-20vw"
        filter
        inputId="courses-dropdown"
        loading={infoLoading || allCoursesLoading || coursesLoading}
        onChange={(event) =>
          setQueryParameters({ courseId: event.target.value })
        }
        optionLabel="courseName"
        optionValue="id"
        options={coursesOptions}
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
