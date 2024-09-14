import {
  setMainTableSelectedQuestions,
  useAddQuestionsToExamStore,
} from '../store';
import QuestionRowExpansion from './QuestionRowExpansion';
import { useQuestionsTable } from '@/routes/_home.questions.list/services/query';
import { type TFirebaseQuestion } from '@/routes/_home.questions.list/types/types';
import { isRowExpandable } from '@/routes/_home.questions.list/utils/functions';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, type DataTableExpandedRows } from 'primereact/datatable';

const Content = () => {
  const { state } = useLocation();
  const { data: questions, isLoading } = useQuestionsTable(state.courseId);
  const mainTableSelectedQuestions = useAddQuestionsToExamStore(
    (store) => store.mainTableSelectedQuestions
  );
  const [expandedRows, setExpandedRows] = useState<
    TFirebaseQuestion[] | DataTableExpandedRows
  >([]);

  return (
    <div>
      <h3>
        <Trans>Select Questions</Trans>
      </h3>

      {isLoading && <p>Loading...</p>}

      {!isLoading && questions && (
        <DataTable
          dataKey="id"
          emptyMessage={
            <div className="w-fit m-auto flex  flex-col items-center justify-center">
              <i className="pi pi-inbox text-3rem" />
              <p className="text-xl mt-1rem">
                <Trans>No records found</Trans>
              </p>
            </div>
          }
          expandedRows={expandedRows}
          onRowToggle={(event) => setExpandedRows(event.data)}
          onSelectionChange={(event) =>
            setMainTableSelectedQuestions(event.value)
          }
          paginator
          rowExpansionTemplate={(rowData) => (
            <QuestionRowExpansion data={rowData.aiGeneratedQuestions} />
          )}
          rows={10}
          selection={mainTableSelectedQuestions}
          selectionMode="checkbox"
          size="small"
          stripedRows
          value={questions}
        >
          <Column
            expander={isRowExpandable || undefined}
            headerClassName="w-3rem"
          />
          <Column headerClassName="w-3rem" selectionMode="multiple" />
          <Column field="question" header={t`Question`} />
        </DataTable>
      )}

      <Button label="Submit" onClick={() => {}} />
    </div>
  );
};

export default Content;
