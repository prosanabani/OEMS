import { useDeleteCourseMutation } from '../services/mutate';
import { useEnrolledCoursesList } from '../services/query';
import { courseLevelBody } from '../utils/generators';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

type TProps = {
  readonly studentId: string;
};

export default function CoursesEnrolledCourses({ studentId }: TProps) {
  const { data: UserEnrolledCourses, isLoading } =
    useEnrolledCoursesList(studentId);

  const { mutate: deleteCourse } = useDeleteCourseMutation();

  const onDeleteCourse = (courseId: string) => {
    deleteCourse({ courseId, studentId });
  };

  const deleteButtonTemplate = (rowData: { id: string }) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => onDeleteCourse(rowData.id)}
        rounded
        severity="danger"
      />
    );
  };

  return (
    <div className="card">
      <h3>Registered Courses</h3>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <DataTable value={UserEnrolledCourses}>
          <Column field="courseName" header="Course Name" />
          <Column field="courseTeacher" header="Course Teacher" />
          <Column body={courseLevelBody} header="Course Level" />
          <Column body={deleteButtonTemplate} header="Actions" />
        </DataTable>
      )}
    </div>
  );
}
