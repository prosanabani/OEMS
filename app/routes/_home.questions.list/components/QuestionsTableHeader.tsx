import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const QuestionsTableHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText placeholder={t`Search for questions`} />
      </IconField>
      <Button
        label={t`Add question`}
        onClick={() => navigate('/questions/list/new-question')}
      />
    </div>
  );
};

export default QuestionsTableHeader;
