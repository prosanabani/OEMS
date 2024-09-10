import { useCoursesListTable } from '../services/query';
import { useCourseListStore } from '../store';
import { filterData } from '../utils/functions';
import { ActionBodyTemplate, SearchBodyTemplate } from '../utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Outlet } from 'react-router-dom';

export function CoursesListComponent() {
  const SearchInput = useCourseListStore((state) => state.SearchInput);

  const { data, isLoading } = useCoursesListTable();
  const displayedData = filterData(data || [], SearchInput);

  return (
    <div className="card">
      <DataTable
        header={SearchBodyTemplate}
        loading={isLoading}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        stripedRows
        value={displayedData}
      >
        <Column field="courseName" header={t`courseName`} sortable />
        <Column field="courseLevel" header={t`courseLevel`} sortable />
        <Column field="courseTeacher" header={t`courseTeacher`} sortable />
        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
      <Outlet />
    </div>
  );
}
