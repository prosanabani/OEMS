import { setSearchInput, useExamListStore } from '../store';
import CoursesDropDown from './TableHeader.CoursesDropDown';
import { useUserInfo } from '@/services/userQueries';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const TableHeader = () => {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useUserInfo();
  const SearchInput = useExamListStore((state) => state.SearchInput);
  return (
    <div className="flex justify-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Search for exam`}
          value={SearchInput}
        />
      </IconField>
      <CoursesDropDown />
      <Button
        disabled={userInfo?.role === 'student'}
        label={t`Create new Exam`}
        loading={isLoading}
        onClick={() => navigate('add')}
      />
    </div>
  );
};

export default TableHeader;
