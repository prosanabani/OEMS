import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Controller, useForm } from 'react-hook-form';

type FormInputs = {
  correctAnswer: string;
  question: string;
};

const TrueOrFalseForm = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<FormInputs>();

  return (
    <Card title="True or False Question Form">
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
      <div className="field">
        <label>Correct Answer</label>
        <div className="flex justify-center items-center gap-2">
          <Controller
            control={control}
            name="correctAnswer"
            render={({ field }) => {
              return (
                <RadioButton
                  checked={field.value === 'true'}
                  className={errors.correctAnswer ? 'p-invalid' : ''}
                  inputId="correctAnswerTrue"
                  onChange={(event) => field.onChange(event.value)}
                  value="true"
                />
              );
            }}
            rules={{ required: 'Correct answer is required' }}
          />
          <label className="hover:cursor-pointer" htmlFor="correctAnswerTrue">
            True
          </label>{' '}
          <Controller
            control={control}
            name="correctAnswer"
            render={({ field }) => {
              return (
                <RadioButton
                  checked={field.value === 'false'}
                  className={errors.correctAnswer ? 'p-invalid' : ''}
                  inputId="correctAnswerFalse"
                  onChange={(event) => field.onChange(event.value)}
                  value="false"
                />
              );
            }}
            rules={{ required: 'Correct answer is required' }}
          />
          <label className="hover:cursor-pointer" htmlFor="correctAnswerFalse">
            False{' '}
          </label>{' '}
        </div>

        {errors.correctAnswer && (
          <small className="p-error">{errors.correctAnswer.message}</small>
        )}
      </div>
    </Card>
  );
};

export default TrueOrFalseForm;
