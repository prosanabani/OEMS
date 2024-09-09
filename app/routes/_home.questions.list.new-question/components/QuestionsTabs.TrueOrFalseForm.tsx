import { type TFormQuestions } from './Form';
import { Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Controller, useFormContext } from 'react-hook-form';

const TrueOrFalseForm = () => {
  const {
    control,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useFormContext<TFormQuestions>();

  useEffect(() => {
    reset();
    setValue('questionType', 'trueOrFalse');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="field">
        <FloatLabel>
          <InputText
            autoFocus
            className={errors.question ? 'p-invalid' : ''}
            id="question"
            pt={{
              root: {
                className: 'w-full',
              },
            }}
            {...register('question', { required: 'Question is required' })}
          />
          <label htmlFor="question">
            <Trans>Question</Trans>
          </label>
        </FloatLabel>
        {errors.question && (
          <small className="p-error">{errors.question.message}</small>
        )}
      </div>
      <div className="field flex flex-col gap-2">
        <label>
          <Trans>Correct Answer</Trans>
        </label>
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="questionCorrectAnswer"
            render={({ field }) => (
              <>
                <RadioButton
                  checked={field.value === 'true'}
                  className={errors.questionCorrectAnswer ? 'p-invalid' : ''}
                  inputId="questionCorrectAnswerTrue"
                  onChange={(event) => field.onChange(event.value)}
                  value="true"
                />
                <label
                  className="hover:cursor-pointer"
                  htmlFor="questionCorrectAnswerTrue"
                >
                  <Trans>True</Trans>
                </label>
                <RadioButton
                  checked={field.value === 'false'}
                  className={errors.questionCorrectAnswer ? 'p-invalid' : ''}
                  inputId="questionCorrectAnswerFalse"
                  onChange={(event) => field.onChange(event.value)}
                  value="false"
                />
                <label
                  className="hover:cursor-pointer"
                  htmlFor="questionCorrectAnswerFalse"
                >
                  <Trans>False</Trans>
                </label>
              </>
            )}
            rules={{ required: 'Correct answer is required' }}
          />
        </div>
        {errors.questionCorrectAnswer && (
          <small className="p-error">
            {errors.questionCorrectAnswer.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default TrueOrFalseForm;
