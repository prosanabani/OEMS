import { QuestionTypeBodyTemplate } from '../_home.questions.list/utils/generators';
import Header from './components/Header';
import { useAiGeneratedQuestionsData } from './services/query';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const { data: AiGeneratedQuestions, isLoading } =
    useAiGeneratedQuestionsData();

  return (
    <DataTable
      className="p-5"
      dataKey="id"
      header={<Header />}
      loading={isLoading}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      scrollHeight="60vh"
      scrollable
      size="small"
      stripedRows
      value={AiGeneratedQuestions}
    >
      <Column
        className="w-70%"
        field="question"
        header={t`Ai Question`}
        sortable
      />
      <Column
        body={QuestionTypeBodyTemplate}
        field="questionType"
        header={t`Question Type`}
        sortable
      />
    </DataTable>
  );
}
