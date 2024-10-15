/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionRowExpansion from './components/QuestionRowExpantion';
import QuestionsTableHeader from './components/QuestionTableHeader';
import { useQuestionsTable } from './services/query';
import { setExpandedRows, useQuestionListStore } from './store';
import { isRowExpandable } from './utils/functions';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const queryParameters = useQuestionListStore((state) => state.queryParams);
  const { data: QuestionsList, isLoading } = useQuestionsTable(
    queryParameters.courseId
  );
  const { expandedRows } = useQuestionListStore();

  useEffect(() => {
    setExpandedRows(expandedRows);
  }, [expandedRows]);

  return (
    <>
      <DataTable
        expandedRows={expandedRows || []}
        header={<QuestionsTableHeader />}
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
        rowExpansionTemplate={(rowData) => (
          <QuestionRowExpansion data={rowData.aiGeneratedQuestions} />
        )}
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        scrollHeight="55vh"
        scrollable
        size="small"
        stripedRows
        value={QuestionsList}
      >
        <Column expander={isRowExpandable || undefined} />
        <Column field="question" header={t`Question`} sortable />
        <Column field="questionType" header={t`Type`} sortable />
        {/* <Column body={ActionBodyTemplate} header={t`Actions`} /> */}
      </DataTable>
      <Outlet />
    </>
  );
}
