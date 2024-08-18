/* eslint-disable @typescript-eslint/no-explicit-any */
import useNewQuestionData from '../services/query';
import { setGeneratedQuestions } from '../store';
import { type TFormQuestions } from './Form';
import PickerTab from './PickerTab';
import QuestionsTabs from './QuestionsTabs';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useFormContext } from 'react-hook-form';

const DialogContent = () => {
  const stepperRef = useRef<any>(null);
  const [generateQuestion, setGenerateQuestion] = useState(false);
  const { handleSubmit, watch } = useFormContext<TFormQuestions>();

  const { data, isLoading } = useNewQuestionData(watch(), generateQuestion);

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      setGeneratedQuestions(data);
      stepperRef.current.nextCallback();
    }
  }, [data]);

  return (
    <Stepper ref={stepperRef}>
      <StepperPanel header={t`Question`}>
        {isLoading ? (
          <div className="flex justify-center mt-25vh">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            <QuestionsTabs />
            <div className="flex pt-4 justify-end items-end">
              <Button
                icon="pi pi-arrow-right"
                iconPos="right"
                label={t`Generate`}
                onClick={handleSubmit(() => setGenerateQuestion(true))}
                type="submit"
                // onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </>
        )}
      </StepperPanel>
      <StepperPanel header={t`AI generated Question`}>
        <PickerTab />
        <div className="flex mt-4 gap-2 justify-end">
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            onClick={() => stepperRef.current.prevCallback()}
            severity="secondary"
          />
          <Button label={t`Add to Questions`} onClick={() => {}} />
        </div>
      </StepperPanel>
    </Stepper>
  );
};

export default DialogContent;
