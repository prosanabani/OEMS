import { useExamDetails } from '../exams.$examId.credentials/services/query';
import ExamPageHeader from './components/ExamPageHeader';
import Form from './components/Form';
import QuestionsStepper from './components/QuestionsStepper';
import { generateQuestionsFormat, generateTitle } from './utils/functions';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';

type questionsFormatObject = {
  count: number;
  isIncluded: boolean;
  marksPerQuestion: number;
  type: 'theoretical' | 'multipleChoice' | 'trueOrFalse';
};

export function Component() {
  const { examId } = useParams();

  const { data: examDetails } = useExamDetails(examId || '') || {};

  const questionsFormat: questionsFormatObject[] =
    generateQuestionsFormat(examDetails);

  return (
    <Form>
      {/* <AiMonitoring /> */}
      <ExamPageHeader />
      <ScrollPanel
        className="max-h-80vh w-fit"
        pt={{
          barY: {
            className: 'bg-blue',
          },
        }}
      >
        <div className="w-70vw m-auto">
          {questionsFormat.map((item) => {
            return (
              <div key={item.type}>
                <Panel header={generateTitle(item.type)} toggleable>
                  <QuestionsStepper
                    marksPerQuestion={item.marksPerQuestion}
                    questionType={item.type}
                    questionsCount={item.count}
                  />
                </Panel>
              </div>
            );
          })}
        </div>
      </ScrollPanel>
    </Form>
  );
}
