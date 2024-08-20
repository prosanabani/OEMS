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
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
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
        <Column body={ActionBodyTemplate} header={t`Actions`} sortable />
      </DataTable>
      <Outlet />
    </div>
  );
}
