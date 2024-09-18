/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionRowExpansion from './components/QuestionRowExpansion';
import QuestionsTableHeader from './components/QuestionsTableHeader';
import { useQuestionsTable } from './services/query';
import { setExpandedRows, useQuestionListStore } from './store';
import { filterData, isRowExpandable } from './utils/functions';
import {
  ActionBodyTemplate,
  AnswersTemplate,
  QuestionTypeBodyTemplate,
} from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const { SearchInput, expandedRows } = useQuestionListStore((state) => ({
    expandedRows: state.expandedRows,
    SearchInput: state.SearchInput,
  }));
  const queryParameters = useQuestionListStore((state) => state.queryParams);
  const { data: QuestionsList, isLoading } = useQuestionsTable(
    queryParameters.courseId
  );
  const filteredData = filterData(QuestionsList || [], SearchInput);

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
          // paginator: {
          //   root: {
          //     className: 'bg-slate-200',
          //   },
          // },
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
        value={filteredData}
      >
        <Column expander={isRowExpandable || undefined} />
        <Column field="question" header={t`Question`} sortable />
        <Column
          body={QuestionTypeBodyTemplate}
          field="questionType"
          header={t`Type`}
          sortable
        />
        <Column
          body={AnswersTemplate}
          field="questionAnswers"
          header={t`Answers`}
          sortable
        />
        <Column
          field="questionCorrectAnswer"
          header={t`Correct Answer`}
          sortable
        />
        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
      <Outlet />
    </>
  );
}
