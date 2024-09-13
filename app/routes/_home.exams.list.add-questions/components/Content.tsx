import { useQuestionsByCourseId } from '../services/query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useForm } from 'react-hook-form';

const Content = () => {
  const { state } = useLocation();
  const { data: questions, isLoading } = useQuestionsByCourseId(state.courseId);
  const [selectedQuestions, setSelectedQuestions] = useState<[]>([]);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    // console.log(selectedQuestions);
    // console.log('Selected questions added to teacher questions table.');
  };

  return (
    <div>
      <h3>Select Questions</h3>

      {isLoading && <p>Loading...</p>}

      {!isLoading && questions && (
        <DataTable
          dataKey="id"
          onSelectionChange={(event) => setSelectedQuestions(event.value)}
          paginator
          rows={10}
          selection={selectedQuestions}
          selectionMode="multiple"
          value={questions}
        >
          <Column headerStyle={{ width: '3em' }} selectionMode="multiple" />
          <Column field="question" header="Question Text" />
          {/* Add more columns as necessary */}
        </DataTable>
      )}

      <Button label="Submit" onClick={handleSubmit(onSubmit)} />
    </div>
  );
};

export default Content;
