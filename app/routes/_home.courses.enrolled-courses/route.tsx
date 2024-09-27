import { useDeleteEnrolledCourseMutation } from './services/mutate';
import { useEnrolledCoursesList } from './services/query';
import { courseLevelBody } from './utils/generators';
import { useUserInfo } from '@/services/userQueries';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const { data: userInfo } = useUserInfo();
  const studentId = userInfo?.id;
  const {
    data: UserEnrolledCourses,
    isFetching,
    isLoading,
  } = useEnrolledCoursesList(studentId || '');

  const { isPending, mutate: deleteCourse } = useDeleteEnrolledCourseMutation();

  const [Visible, setVisible] = useState<boolean>(false);
  const deleteButtonTemplate = (rowData: { id: string }) => {
    return (
      <>
        <ConfirmDialog
          accept={() =>
            deleteCourse({ courseId: rowData.id, studentId: studentId || '' })
          }
          acceptClassName="p-button-danger"
          defaultFocus="reject"
          draggable={false}
          header={t` Are you sure you want to Delete ?`}
          icon="pi pi-exclamation-triangle text-red"
          message={
            <span className="p-error">
              <Trans>Course enrolled will be deleted !</Trans>
            </span>
          }
          onHide={() => setVisible(false)}
          visible={Visible}
        />
        <Button
          className="p-button-rounded mr-2"
          icon="pi pi-trash"
          loading={isPending}
          onClick={() => setVisible(true)}
          severity="danger"
        />
      </>
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
