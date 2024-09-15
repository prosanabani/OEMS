import { useQuestionsTable } from '../services/query';
import { setExpandedRows, useQuestionListStore } from '../store';
import CoursesDropDown from './Filter.CoursesDropDown';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';

const QuestionsTableHeader = () => {
  const navigate = useNavigate();
  const queryParameters = useQuestionListStore((state) => state.queryParams);
  const { data: questions } = useQuestionsTable(queryParameters.courseId);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setExpandedRows([]);
  }, [isExpanded, questions]);

  return (
    <div className="flex justify-between px-2 py-4">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText placeholder={t`Search for questions`} />
      </IconField>

      <CoursesDropDown />

      <ToggleButton
        checked={isExpanded}
        offIcon="pi pi-plus"
        offLabel="Expand All"
        onChange={(event) => {
          if (event.value) {
            setExpandedRows(questions);
            setIsExpanded(true);
          } else {
            setExpandedRows([]);
            setIsExpanded(false);
          }
        }}
        onIcon="pi pi-minus"
        onLabel="Collapse All"
      />
      <Button
        label={t`Add question`}
        onClick={() => navigate('/questions/list/choose-course')}
      />
    </div>
  );
};

export default QuestionsTableHeader;
