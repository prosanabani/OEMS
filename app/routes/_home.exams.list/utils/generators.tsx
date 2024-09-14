import DeleteButton from '../components/DeleteButton';
import { type TExamList } from '../types/examListType';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';

export const ActionBodyTemplate = (rowData: TExamList) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        label={t`Edit`}
        onClick={() => navigate('edit', { state: rowData })}
        rounded
        severity="success"
      />

      <DeleteButton examId={rowData.id} />
    </div>
  );
};

const ExamRowExpansion = (rowData: TExamList) => {
  return (
    <div className="p-5">
      <div>
        <Trans>{rowData.examDescription}</Trans>
      </div>
    </div>
  );
};

export default ExamRowExpansion;
