import { AddUserFormValues } from '../_home.users.list.new-user/services/types';
import { useUsersListTable } from './services/query';
import { useUserListStore } from './store';
import { filterData } from './utils/functions';
import { ActionBodyTemplate, SearchBodyTemplate } from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
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
        <Column field="fullName" header="Name" sortable />
        <Column field="role" header="Role" sortable />
        <Column field="level" header="StudentLevel" sortable />
        <Column body={ActionBodyTemplate} header="Actions" />
      </DataTable>
      <Outlet />
    </div>
  );
}
