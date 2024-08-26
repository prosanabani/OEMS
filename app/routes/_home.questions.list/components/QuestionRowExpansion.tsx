import { type TQuestion } from '../types/types';
import { ActionBodyTemplate, AnswersTemplate } from '../utils/generators';
import { t, Trans } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

type TProps = {
  readonly data: TQuestion[];
};
const QuestionRowExpansion = ({ data }: TProps) => {
  return (
    <div className="w-95% ml-5%">
      <div className="">
        <Trans>Ai generated questions</Trans>
      </div>
      <DataTable value={data}>
        <Column field="question" header={t`Question`} sortable />
        <Column
          body={AnswersTemplate}
          field="questionAnswers"
          header={t`Answers`}
          sortable
        />
        <Column body={ActionBodyTemplate} header={t`Actions`} />
      </DataTable>
    </div>
  );
};

export default QuestionRowExpansion;
