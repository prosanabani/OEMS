import QuestionRowExpansion from './components/QuestionRowExpansion';
import QuestionsTableHeader from './components/QuestionsTableHeader';
import { useQuestionsTable } from './services/query';
import { type TQuestion } from './types/types';
import { isRowExpandable } from './utils/functions';
import {
  ActionBodyTemplate,
  AnswersTemplate,
  QuestionTypeBodyTemplate,
} from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const [expandedRows, setExpandedRows] = useState<TQuestion[] | null>(null);

  const { data } = useQuestionsTable();

  return (
    <>
      <DataTable
        expandedRows={expandedRows || []}
        header={<QuestionsTableHeader />}
        onRowToggle={(event: { data: TQuestion[] }) =>
          setExpandedRows(event.data)
        }
        paginator
        pt={{
          header: {
            className: 'rounded-t-5',
          },
          paginator: {
            root: {
              className: 'bg-slate-200',
            },
          },
          root: {
            className: 'mx-5 mt-5',
          },
        }}
        resizableColumns
        rowExpansionTemplate={(rowData) => (
          <QuestionRowExpansion data={rowData.aiGeneratedQuestions} />
        )}
        rows={20}
        rowsPerPageOptions={[5, 10, 25, 50]}
        scrollHeight="55vh"
        scrollable
        stripedRows
        value={data}
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
