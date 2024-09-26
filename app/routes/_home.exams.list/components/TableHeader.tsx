import { setSearchInput, useExamListStore } from '../store';
import CoursesDropDown from './TableHeader.CoursesDropDown';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const TableHeader = () => {
  const navigate = useNavigate();
  const SearchInput = useExamListStore((state) => state.SearchInput);
  return (
    <div className="flex justify-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Search for questions`}
          value={SearchInput}
        />
      </IconField>
      <CoursesDropDown />
      <Button label={t`Create new Exam`} onClick={() => navigate('add')} />
    </div>
  );
};

export default TableHeader;
