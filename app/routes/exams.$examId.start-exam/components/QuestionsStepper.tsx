import { useGetRandomExamQuestions } from '../services/query';
import QuestionCell from './QuestionStepper.QuestionCell';
import { useExamDetails } from '@/routes/exams.$examId.credentials/services/query';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Stepper, type StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

type TProps = {
  readonly marksPerQuestion: number;
  readonly questionType: 'theoretical' | 'multipleChoice' | 'trueOrFalse';
  readonly questionsCount: number;
};
const QuestionsStepper = ({
  marksPerQuestion,
  questionType,
  questionsCount,
}: TProps) => {
  const { examId } = useParams();

  const { data: examDetails, isLoading: examDetailsLoading } = useExamDetails(
    examId || ''
  );
  const stepperRef = useRef<StepperRefAttributes>(null);

  const { data: randomQuestionsExams, isLoading: randomQuestionsExamsLoading } =
    useGetRandomExamQuestions(
      examDetails?.courseId || '',
      examDetails?.examQuestions || []
    );

  if (randomQuestionsExamsLoading || examDetailsLoading) {
    return <ProgressSpinner />;
  }

  return (
    <Stepper orientation="vertical" ref={stepperRef}>
      {randomQuestionsExams
        ?.filter((item) => item.aiQuestion?.questionType === questionType)
        .map(({ aiQuestion }, index) => {
          return (
            <StepperPanel
              header={aiQuestion?.question}
              key={aiQuestion?.id}
              pt={{
                title: {
                  className: 'ml-2 flex text-left',
                },
              }}
            >
              <div className="py-5">
                <QuestionCell
                  currentQuestionIndex={index}
                  marksPerQuestion={marksPerQuestion}
                  question={aiQuestion}
                />
              </div>
              <div className="navigation-Buttons flex justify-between">
                <Button
                  disabled={index === 0}
                  icon="pi pi-arrow-left"
                  iconPos="left"
                  label={t`Previous`}
                  onClick={() => stepperRef.current?.prevCallback()}
                  tooltip={index === 0 ? t`can't go back` : undefined}
                  tooltipOptions={{
                    showOnDisabled: true,
                  }}
                />
                <Button
                  disabled={index === questionsCount - 1}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label={t`Next`}
                  onClick={() => stepperRef.current?.nextCallback()}
                  tooltip={
                    index === questionsCount - 1 ? t`can't go next` : undefined
                  }
                  tooltipOptions={{
                    position: 'left',
                    showOnDisabled: true,
                  }}
                />
              </div>
            </StepperPanel>
          );
        })}
    </Stepper>
  );
};

export default QuestionsStepper;
