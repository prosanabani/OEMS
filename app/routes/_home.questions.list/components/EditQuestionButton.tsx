import { type TQuestion } from '../types/types';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type TProps = {
  readonly questionData: any;
};

const EditQuestionButton = ({ questionData }: TProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const inputReferences = useRef<Array<HTMLInputElement | null>>([]);

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<TQuestion>({
    defaultValues: {
      id: questionData.id,
      question: questionData.question,
      questionAnswers: questionData.questionAnswers,
      questionCorrectAnswer: questionData.questionCorrectAnswer,
      questionType: questionData.questionType,
    },
  });

  const currentAnswers = watch('questionAnswers');
  const questionCorrectAnswer = watch('questionCorrectAnswer');

  useEffect(() => {
    if (visible && questionCorrectAnswer !== undefined) {
      const index =
        currentAnswers?.split(',').indexOf(questionCorrectAnswer) || -1;
      if (index !== -1) {
        inputReferences.current[index]?.focus();
      }
    }
  }, [currentAnswers, questionCorrectAnswer, visible]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const valueArray = currentAnswers?.split(',').filter(Boolean) || [];
    valueArray[index] = event.target.value;
    setValue('questionAnswers', valueArray.join(','), { shouldDirty: true });
  };

  return (
    <>
      <Dialog
        dismissableMask
        draggable={false}
        footer={
          <Button
            disabled={!isDirty}
            icon="pi pi-check"
            label={t`Save`}
            onClick={handleSubmit((FormData) => console.log(FormData))}
            type="submit"
          />
        }
        header={
          <div className="">
            <Trans>Edit Question</Trans>
          </div>
        }
        onHide={() => {
          reset();
          setVisible(false);
        }}
        pt={{
          root: {
            className: 'w-50vw h-50vh',
          },
        }}
        visible={visible}
      >
        <div className="flex flex-col gap-6">
          <div className="p-field question mt-5">
            <Controller
              control={control}
              name="question"
              render={({ field }) => (
                <FloatLabel>
                  <InputText
                    {...field}
                    className={errors.question ? 'p-invalid' : ''}
                    pt={{
                      root: {
                        className: 'w-full',
                      },
                    }}
                  />
                  <label>
                    <Trans>Question</Trans>
                  </label>
                </FloatLabel>
              )}
              rules={{ required: 'Question is required' }} // Added validation rule here
            />
            {errors.question && (
              <small className="p-error">{errors.question.message}</small>
            )}
          </div>
          {questionData?.questionAnswers
            ?.split(',')
            .map((answer: string, index: number) => (
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
                        ref={(element) =>
                          (inputReferences.current[index] = element)
                        }
                        value={currentAnswers?.split(',')[index] || ''}
                      />
                      <label>
                        <Trans>Choice</Trans> {index + 1}
                      </label>
                    </FloatLabel>
                  )}
                  rules={{ required: 'Answer is required' }} // Added validation rule here
                />
                {errors.questionAnswers && (
                  <small className="p-error">
                    {errors.questionAnswers.message}
                  </small>
                )}
              </div>
            ))}

          <div className="flex mt-3 items-center gap-3">
            {questionData?.questionAnswers
              ?.split(',')
              .map((_: any, index: number) => (
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
                        <label htmlFor={`radio-${index}`}>
                          Choice {index + 1}
                        </label>
                      </>
                    )}
                    rules={{ required: 'Correct Answer is required' }} // Validation rule already exists here
                  />
                </div>
              ))}
          </div>
        </div>
      </Dialog>
      <Button
        className="p-button-rounded mr-2"
        icon="pi pi-pencil"
        onClick={() => setVisible(true)}
        severity="success"
      />
    </>
  );
};

export default EditQuestionButton;
