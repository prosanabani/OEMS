import QuestionsTableHeader from './components/QuestionsTableHeader';
import {
  ActionBodyTemplate,
  QuestionTypeBodyTemplate,
} from './utils/generators';
import { questions } from './utils/temperoryData';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  return (
    <div className="">
      <DataTable
        header={<QuestionsTableHeader />}
        paginator
        pt={{
          header: {
            className: 'rounded-t-5',
          },
          root: {
            className: 'mx-5 mt-5',
          },
        }}
        rows={20}
        rowsPerPageOptions={[5, 10, 25, 50]}
        scrollHeight="65vh"
        scrollable
        stripedRows
        value={questions}
      >
        <Column field="id" header={t`ID`} sortable />
        <Column field="question" header={t`Question`} sortable />
        <Column
          body={QuestionTypeBodyTemplate}
          field="questionType"
          header={t`Type`}
          sortable
        />
        <Column field="answers" header={t`Answers`} sortable />
        <Column field="correctAnswer" header={t`Correct Answer`} sortable />
        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
      <Outlet />
    </div>
  );
}
