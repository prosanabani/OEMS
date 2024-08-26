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

  const currentAnswers = watch('questionAnswers');
  const questionCorrectAnswer = watch('questionCorrectAnswer');

  useEffect(() => {
    reset();
    setValue('questionType', 'multipleChoice');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questionCorrectAnswer !== undefined) {
      const index =
        currentAnswers?.split(',').indexOf(questionCorrectAnswer) || -1;
      if (index !== -1) {
        inputReferences.current[index]?.focus();
      }
    }
  }, [currentAnswers, questionCorrectAnswer]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const valueArray = currentAnswers?.split(',').filter(Boolean) || [];
    valueArray[index] = event.target.value;
    setValue('questionAnswers', valueArray.join(','));
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
            name="questionAnswers"
            render={() => (
              <FloatLabel>
                <InputText
                  className={errors.questionAnswers ? 'p-invalid' : ''}
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
          {errors.questionAnswers && (
            <small className="p-error">{errors.questionAnswers.message}</small>
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
                name="questionCorrectAnswer"
                render={() => (
                  <>
                    <RadioButton
                      checked={
                        questionCorrectAnswer ===
                        currentAnswers?.split(',')[index]
                      }
                      className={
                        errors.questionCorrectAnswer ? 'p-invalid' : ''
                      }
                      inputId={`radio-${index}`}
                      name="questionCorrectAnswer"
                      onChange={(event) =>
                        setValue('questionCorrectAnswer', event.value)
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
