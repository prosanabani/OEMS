import {
  setRowExpansionSelectedQuestions,
  useAddQuestionsToExamStore,
} from '../store';
import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { t, Trans } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

type TProps = {
  readonly data: TQuestion[];
};
const QuestionRowExpansion = ({ data }: TProps) => {
  const rowExpansionSelectedQuestions = useAddQuestionsToExamStore(
    (state) => state.rowExpansionSelectedQuestions
  );
  return (
    <div className="w-95% ml-5%">
      <div className="">
        <Trans>
          Ai generated questions that will be displayed for the student
        </Trans>
      </div>
      <DataTable
        // onSelectionChange={(event) =>
        //   setRowExpansionSelectedQuestions(event.value)
        // }
        // selection={rowExpansionSelectedQuestions}
        // selectionMode="multiple"
        stripedRows
        value={data}
      >
        {/* <Column headerStyle={{ width: '3em' }} selectionMode="multiple" /> */}

        <Column field="question" header={t`Question`} sortable />
      </DataTable>
    </div>
  );
};

export default QuestionRowExpansion;
