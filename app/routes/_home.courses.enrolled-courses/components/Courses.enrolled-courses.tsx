import { useDeleteCourseMutation } from '../services/mutate';
import { useEnrolledCoursesList } from '../services/query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function CoursesEnrolledCourses({
  courseId,
}: {
  readonly courseId: string;
}) {
  const { data: courses, isLoading } = useEnrolledCoursesList(courseId);

  const { mutate: deleteCourse } = useDeleteCourseMutation(courseId);
  const toast = useRef<Toast>(null);

  const onDeleteCourse = (studentId: string) => {
    deleteCourse(studentId, {
      onError: () => {
        toast.current?.show({
          detail: 'Failed to delete the course.',
          life: 3_000,
          severity: 'error',
          summary: 'Error',
        });
      },
      onSuccess: () => {
        toast.current?.show({
          detail: 'The course has been successfully deleted.',
          life: 3_000,
          severity: 'success',
          summary: 'Course Deleted',
        });
      },
    });
  };

  const deleteButtonTemplate = (rowData: { value: string }) => {
    return (
      <Button
        className="p-button-danger"
        icon="pi pi-times"
        label="Delete"
        onClick={() => onDeleteCourse(rowData.value)}
      />
    );
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <h3>Registered Courses</h3>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <DataTable value={courses}>
          <Column field="label" header="Course Name" />
          <Column body={deleteButtonTemplate} header="Actions" />
        </DataTable>
      )}
    </div>
  );
}
