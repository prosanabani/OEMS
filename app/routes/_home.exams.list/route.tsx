/* eslint-disable @typescript-eslint/no-explicit-any */
import TableHeader from './components/TableHeader';
import { useExamsData } from './services/query';
import QuestionRowExpansion, { ActionBodyTemplate } from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const { data, isLoading } = useExamsData();
  const [expandedRows, setExpandedRows] = useState([]);

  return (
    <>
      <DataTable
        expandedRows={expandedRows}
        header={<TableHeader />}
        loading={isLoading}
        onRowToggle={(event: { data: any }) => setExpandedRows(event.data)}
        paginator
        pt={{
          header: {
            className: 'rounded-t-5',
          },
          root: {
            className: 'mx-5 mt-5',
          },
        }}
        resizableColumns
        rowExpansionTemplate={QuestionRowExpansion}
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        scrollHeight="55vh"
        scrollable
        size="small"
        stripedRows
        value={data}
      >
        <Column expander />
        <Column field="examName" header={t`Exam Name`} sortable />
        <Column field="examTitle" header={t`Exam Title`} sortable />
        <Column field="examMark" header={t`Mark`} sortable />
        <Column field="examPassMark" header={t`Pass Mark`} sortable />

        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
      <Outlet />
    </>
  );
}
