import { type TFormQuestions } from './Form';
import { Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Controller, useFormContext } from 'react-hook-form';

const MultiChoiceForm = () => {
  const inputReferences = useRef<Array<HTMLInputElement | null>>([]);
  const {
    control,
    formState: { errors },
    register,
    reset,
    setValue,
    watch,
  } = useFormContext<TFormQuestions>();

  const currentAnswers = watch('answers');
  const correctAnswer = watch('correctAnswer');

  useEffect(() => {
    reset();
    setValue('questionType', 'multipleChoice');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (correctAnswer !== undefined) {
      const index = currentAnswers?.split(',').indexOf(correctAnswer) || -1;
      if (index !== -1) {
        inputReferences.current[index]?.focus();
      }
    }
  }, [correctAnswer, currentAnswers]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const valueArray = currentAnswers?.split(',').filter(Boolean) || [];
    valueArray[index] = event.target.value;
    setValue('answers', valueArray.join(','));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="">
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
          <small className="p-error ">{errors.question.message}</small>
        )}
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="p-field" key={index}>
          <Controller
            control={control}
            name="answers"
            render={() => (
              <FloatLabel>
                <InputText
                  className={errors.answers ? 'p-invalid' : ''}
                  onChange={(event) => handleInputChange(event, index)}
                  pt={{
                    root: {
                      className: 'w-full',
                    },
                  }}
                  ref={(element) => (inputReferences.current[index] = element)}
                  value={currentAnswers?.split(',')[index] || ''}
                />
                <label>
                  <Trans>Choice</Trans> {index + 1}
                </label>
              </FloatLabel>
            )}
          />
          {errors.answers && (
            <small className="p-error">{errors.answers.message}</small>
          )}
        </div>
      ))}
      <div className="p-field">
        <label>
          <Trans>Select Correct Value</Trans>
        </label>
        <div className="flex mt-3 items-center gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex gap-2" key={index}>
              <Controller
                control={control}
                name="correctAnswer"
                render={() => (
                  <>
                    <RadioButton
                      checked={
                        correctAnswer === currentAnswers?.split(',')[index]
                      }
                      className={errors.correctAnswer ? 'p-invalid' : ''}
                      inputId={`radio-${index}`}
                      name="correctAnswer"
                      onChange={(event) =>
                        setValue('correctAnswer', event.value)
                      }
                      value={currentAnswers?.split(',')[index] || ''}
                    />
                    <label htmlFor={`radio-${index}`}>Choice {index + 1}</label>
                  </>
                )}
                rules={{ required: 'Correct Answer is required' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiChoiceForm;
