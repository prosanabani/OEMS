import { type TFormQuestions } from './Form';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

const TheoreticalQuestionForm = () => {
  const {
    formState: { errors },
    register,
    reset,
    setValue,
  } = useFormContext<TFormQuestions>();

  useEffect(() => {
    reset();
    setValue('questionType', 'theoretical');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2">
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
          {...register('question', { required: t`Question is required` })}
        />
        <label htmlFor="question">
          <Trans>Question</Trans>
        </label>
      </FloatLabel>

      {errors.question && (
        <small className="p-error">{errors.question.message}</small>
      )}
    </div>
  );
};

export default TheoreticalQuestionForm;
