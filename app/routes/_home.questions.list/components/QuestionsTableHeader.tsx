import { setSearchInput, useQuestionListStore } from '../store';
import CoursesDropDown from './QuestionsTableHeader.CoursesDropDown';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const QuestionsTableHeader = () => {
  const navigate = useNavigate();
  const { SearchInput } = useQuestionListStore((state) => ({
    SearchInput: state.SearchInput,
  }));

  return (
    <div className="flex justify-between px-2 py-4">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Search for questions`}
          value={SearchInput}
        />
      </IconField>

      <CoursesDropDown />

      <Button
        label={t`Add question`}
        onClick={() => navigate('/questions/list/choose-course')}
      />
    </div>
  );
};

export default QuestionsTableHeader;
