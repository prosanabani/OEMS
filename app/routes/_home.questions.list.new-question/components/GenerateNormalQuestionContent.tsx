import QuestionsTabs from './QuestionsTabs';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { useFormContext } from 'react-hook-form';

const GenerateNormalQuestionContent = () => {
  const { handleSubmit } = useFormContext();
  return (
    <div>
      <QuestionsTabs />
      <Button
        icon="pi pi-arrow-right"
        iconPos="right"
        label={t`Add `}
        onClick={handleSubmit((FormData) => console.log(FormData))}
        type="submit"
      />
    </div>
  );
};

export default GenerateNormalQuestionContent;
