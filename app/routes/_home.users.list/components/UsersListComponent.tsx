import { useUsersListTable } from '../services/query';
import { useUserListStore } from '../store';
import { filterData } from '../utils/functions';
import { ActionBodyTemplate, SearchBodyTemplate } from '../utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Outlet } from 'react-router-dom';

export function UsersListComponent() {
  const SearchInput = useUserListStore((state) => state.SearchInput);

  const { data, isLoading } = useUsersListTable();
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
        <Column field="userId" header={t`AccountId`} sortable />
        <Column field="fullName" header={t`Name`} sortable />
        <Column field="role" header={t`Role`} sortable />
        <Column field="level" header={t`StudentLevel`} sortable />
        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
      <Outlet />
    </div>
  );
}
