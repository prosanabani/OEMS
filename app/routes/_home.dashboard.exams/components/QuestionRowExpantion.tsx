import { type TQuestion } from '../types/types';
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
      </DataTable>
    </div>
  );
};

export default QuestionRowExpansion;
