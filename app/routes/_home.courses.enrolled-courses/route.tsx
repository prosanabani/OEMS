import { useDeleteEnrolledCourseMutation } from './services/mutate';
import { useEnrolledCoursesList } from './services/query';
import { courseLevelBody } from './utils/generators';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const studentId = 'kljlkjsdkljfsjoijr454';
  const {
    data: UserEnrolledCourses,
    isFetching,
    isLoading,
  } = useEnrolledCoursesList(studentId);

  const { isPending, mutate: deleteCourse } = useDeleteEnrolledCourseMutation();

  const onDeleteCourse = (courseId: string) => {
    deleteCourse({ courseId, studentId });
  };

  const deleteButtonTemplate = (rowData: { id: string }) => {
    return (
      <Button
        disabled={isLoading || isPending}
        icon="pi pi-trash"
        loading={isLoading || isPending}
        onClick={() => onDeleteCourse(rowData.id)}
        rounded
        severity="danger"
      />
    );
  };

  return (
    <div className="card">
      <h3>Registered Courses</h3>
      <DataTable loading={isLoading || isFetching} value={UserEnrolledCourses}>
        <Column field="courseName" header="Course Name" />
        <Column field="courseTeacher" header="Course Teacher" />
        <Column body={courseLevelBody} header="Course Level" />
        <Column body={deleteButtonTemplate} header="Actions" />
      </DataTable>
    </div>
  );
}
