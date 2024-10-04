import { useUsersListTable } from '../_home.users.list/services/query';
import Header from './components/Header';
import { useVerificationCodeList } from './services/query';
import { useVerificationCodeListStore } from './store';
import { filterData } from './utils/functions';
import { ActionBodyTemplate } from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const { data: usersList, isLoading: usersListLoading } = useUsersListTable();

  const { SearchInput, queryParameters } = useVerificationCodeListStore(
    (state) => ({
      queryParameters: state.queryParameters,
      SearchInput: state.SearchInput,
    })
  );
  const { data: verificationCodeList, isLoading } = useVerificationCodeList(
    queryParameters.courseId || '',
    usersList || []
  );

  const filteredVerificationCodeList = filterData(
    verificationCodeList || [],
    SearchInput
  );

  return (
    <DataTable
      dataKey="studentId"
      header={<Header />}
      loading={isLoading || usersListLoading}
      paginator
      resizableColumns
      rows={5}
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      scrollHeight="55vh"
      scrollable
      size="small"
      stripedRows
      value={filteredVerificationCodeList}
    >
      <Column field="fullName" header={t`Student`} sortable />
      <Column field="verificationCode" header={t`VerificationCode `} sortable />
      <Column
        body={(rowData) =>
          ActionBodyTemplate({ ...rowData, courseId: queryParameters.courseId })
        }
        header={t`Actions`}
      />
    </DataTable>
  );
}
