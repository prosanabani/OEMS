import {
  type TFirebaseQuestion,
  type TQuestion,
} from '@/routes/_home.questions.list/types/types';
import { t, Trans } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';

export const QuestionRowExpansion = ({
  data,
}: {
  readonly data: TQuestion[];
}) => {
  return (
    <div className="w-95% ml-5%">
      <Message
        icon="pi pi-question"
        pt={{
          root: {
            className: 'py-1 my-2 border-l-4 border-l-blue',
          },
        }}
        text={
          <Trans>
            Ai generated questions that will be displayed for the student exam
          </Trans>
        }
      />

      <DataTable stripedRows value={data}>
        <Column field="question" header={t`Question`} sortable />
      </DataTable>
    </div>
  );
};

export const QuestionTypeBodyTemplate = (rowData: TFirebaseQuestion) => {
  const questionTypeObject: { [key: string]: JSX.Element } = {
    multipleChoice: <Tag severity="info" value={t`Multiple Choice`} />,
    theoretical: <Tag severity="warning" value={t`Theoretical`} />,
    trueOrFalse: <Tag severity="success" value={t`True or False`} />,
  };
  return <div>{questionTypeObject[rowData.questionType || '']}</div>;
};
