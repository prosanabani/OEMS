import { t } from '@lingui/macro';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';

type FormType = {
  question: string;
};

const TheoreticalQuestionForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm<FormType>();
  return (
    <Card title={t`Theoretical Question`}>
      <div className="field">
        <label htmlFor="question">Question</label>
        <InputText
          className={errors.question ? 'p-invalid' : ''}
          id="question"
          pt={{
            root: {
              className: 'w-full',
            },
          }}
          {...register('question', { required: 'Question is required' })}
        />
        {errors.question && (
          <small className="p-error">{errors.question.message}</small>
        )}
      </div>
    </Card>
  );
};

export default TheoreticalQuestionForm;
