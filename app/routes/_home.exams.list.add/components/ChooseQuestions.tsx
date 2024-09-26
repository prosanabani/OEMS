import { type TAddExamForm } from '../types/examType';
import {
  QuestionRowExpansion,
  QuestionTypeBodyTemplate,
} from '../utils/generators';
import { useQuestionsTable } from '@/routes/_home.questions.list/services/query';
import { type TFirebaseQuestion } from '@/routes/_home.questions.list/types/types';
import { isRowExpandable } from '@/routes/_home.questions.list/utils/functions';
import { t, Trans } from '@lingui/macro';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column';
import { DataTable, type DataTableExpandedRows } from 'primereact/datatable';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormContext, useWatch } from 'react-hook-form';

const ChooseQuestions = () => {
  const [expandedRows, setExpandedRows] = useState<
    TFirebaseQuestion[] | DataTableExpandedRows
  >([]);
  const { control, setValue } = useFormContext<TAddExamForm>();
  const courseIdWatch = useWatch({ control, name: 'courseId' });
  const examFormatWatch = useWatch({ control, name: 'examFormat' });
  const examQuestionsWatch = useWatch({ control, name: 'examQuestions' }); // Watch for selected questions
  const { data: questions, isLoading } = useQuestionsTable(courseIdWatch || '');

  const validateSelection = (newSelection: TFirebaseQuestion[]): boolean => {
    const multipleChoiceCount = examFormatWatch.multipleChoice.count;
    const theoreticalCount = examFormatWatch.theoretical.count;
    const trueOrFalseCount = examFormatWatch.trueOrFalse.count;

    const multipleChoiceSelected = newSelection.filter(
      (question) => question.questionType === 'multipleChoice'
    ).length;
    const theoreticalSelected = newSelection.filter(
      (question) => question.questionType === 'theoretical'
    ).length;
    const trueOrFalseSelected = newSelection.filter(
      (question) => question.questionType === 'trueOrFalse'
    ).length;

    if (multipleChoiceSelected > multipleChoiceCount) {
      showToast({
        detail: t`You can only select ${multipleChoiceCount} multiple-choice questions.`,
        severity: 'error',
        summary: t`Selection Error`,
      });
      return false;
    }

    if (theoreticalSelected > theoreticalCount) {
      showToast({
        detail: t`You can only select ${theoreticalCount} theoretical questions.`,
        severity: 'error',
        summary: t`Selection Error`,
      });
      return false;
    }

    if (trueOrFalseSelected > trueOrFalseCount) {
      showToast({
        detail: t`You can only select ${trueOrFalseCount} true / false questions.`,
        severity: 'error',
        summary: t`Selection Error`,
      });
      return false;
    }

    return true; // Valid selection
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-2">
        <Trans>Select Questions</Trans>
        <Message
          content={
            <div className="flex gap-2 items-center h-2">
              <Badge
                severity="info"
                value={examFormatWatch.multipleChoice.count}
              />
              <Trans>Multiple Choice</Trans>
            </div>
          }
        />
        <Message
          content={
            <div className="flex gap-2 items-center h-2">
              <Badge
                severity="info"
                value={examFormatWatch.trueOrFalse.count}
              />
              <Trans>T / F</Trans>
            </div>
          }
        />
        <Message
          content={
            <div className="flex gap-2 items-center h-2">
              <Badge
                severity="info"
                value={examFormatWatch.theoretical.count}
              />
              <Trans>Theoretical</Trans>
            </div>
          }
        />
      </div>

      {isLoading && (
        <ProgressSpinner
          pt={{
            root: { className: ' h-full flex justify-center' },
          }}
        />
      )}

      {!isLoading && questions && (
        <DataTable
          dataKey="id"
          emptyMessage={
            <div className="w-fit m-auto flex flex-col items-center justify-center">
              <i className="pi pi-inbox text-3rem" />
              <p className="text-xl mt-1rem">
                <Trans>No records found</Trans>
              </p>
            </div>
          }
          expandedRows={expandedRows}
          onRowToggle={(event) => setExpandedRows(event.data)}
          onSelectionChange={(event) => {
            const newSelection = event.value as TFirebaseQuestion[];
            if (validateSelection(newSelection)) {
              // Update examQuestions in the form context
              setValue(
                'examQuestions',
                newSelection.map((question) => question.id)
              );
            }
          }}
          paginator
          rowExpansionTemplate={(rowData: TFirebaseQuestion) => (
            <QuestionRowExpansion data={rowData.aiGeneratedQuestions} />
          )}
          rows={10}
          scrollHeight="50vh"
          scrollable
          selection={questions.filter((question) =>
            examQuestionsWatch?.includes(question.id)
          )}
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
          <Column field="question" header={t`Question`} sortable />
          <Column
            body={QuestionTypeBodyTemplate}
            field="questionType"
            header={t`Type`}
            sortable
          />
        </DataTable>
      )}
    </div>
  );
};

export default ChooseQuestions;
