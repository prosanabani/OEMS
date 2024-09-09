import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const TableHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText placeholder={t`Search for exam`} />
      </IconField>
      <Button label={t`Create new Exam`} onClick={() => navigate('new-exam')} />
    </div>
  );
};

export default TableHeader;
