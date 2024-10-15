import { useQuestionsTable } from '../services/query';
import { setExpandedRows, useQuestionListStore } from '../store';
import CoursesDropDown from './CourseDropDown';
import { ToggleButton } from 'primereact/togglebutton';

const QuestionsTableHeader = () => {
  const queryParameters = useQuestionListStore((state) => state.queryParams);
  const { data: questions } = useQuestionsTable(queryParameters.courseId);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setExpandedRows([]);
  }, [isExpanded, questions]);

  return (
    <div className="flex justify-between px-2 py-4">
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
    </div>
  );
};

export default QuestionsTableHeader;
