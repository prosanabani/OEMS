import { type TExamAnswersFormType } from '../types/ExamAnswersFormType';
import { type TQuestion } from '@/routes/_home.questions.list/types/types';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Tag } from 'primereact/tag';
import { Controller, useFormContext } from 'react-hook-form';

type TProps = {
  readonly currentQuestionIndex: number;
  readonly marksPerQuestion: number;
  readonly question: TQuestion | null;
};
const QuestionCell = ({
  currentQuestionIndex,
  marksPerQuestion,
  question,
}: TProps) => {
  const { control } = useFormContext<TExamAnswersFormType>();

  const questionTypeLiteralMapping: { [key: string]: JSX.Element | null } = {
    default: null,
    multipleChoice: (
      <div>
        <Controller
          control={control}
          name={`multipleChoice.${currentQuestionIndex}.StudentChosenAnswer`}
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="flex items-center gap-5 ">
                {(question?.questionAnswers || '')
                  .split(',')
                  .map((answer, index) => {
                    return (
                      <div className="flex items-center gap-2 " key={index}>
                        <RadioButton
                          checked={
                            (field?.value?.studentAnswer || '') === answer
                          }
                          className={error ? 'p-invalid' : ''}
                          inputId={`answer${index}`}
                          key={index}
                          onChange={(event) =>
                            field.onChange({
                              correctAnswer: question?.questionCorrectAnswer,
                              givenMark:
                                event.value === question?.questionCorrectAnswer
                                  ? marksPerQuestion
                                  : 0,
                              marksPerQuestion,
                              questionId: question?.id || '',
                              studentAnswer: event.value,
                            })
                          }
                          value={answer}
                        />
                        <label
                          className={error ? 'p-error' : ''}
                          htmlFor={`answer${index}`}
                        >
                          {answer}
                        </label>
                      </div>
                    );
                  })}
              </div>
              {error && <small className="p-error">{error.message}</small>}
            </>
          )}
          rules={{
            required: t`* Answer is required`,
          }}
        />
      </div>
    ),
    theoretical: (
      <div>
        <Controller
          control={control}
          name={`theoretical.${currentQuestionIndex}.StudentChosenAnswer`}
          render={({ field, fieldState: { error } }) => (
            <>
              <FloatLabel>
                <InputTextarea
                  className={error ? 'p-invalid' : ''}
                  cols={30}
                  onChange={(event) =>
                    field.onChange({
                      correctAnswer: question?.questionCorrectAnswer,
                      givenMark:
                        event.target.value === question?.questionCorrectAnswer
                          ? marksPerQuestion
                          : 0,
                      marksPerQuestion,
                      questionId: question?.id || '',
                      studentAnswer: event.target.value,
                    })
                  }
                  placeholder={t`Write your answer here...`}
                  pt={{
                    root: {
                      className: 'max-w-90% min-h-200px',
                    },
                  }}
                  rows={5}
                  value={field?.value?.studentAnswer || ''}
                />
                <label className={error ? 'p-error' : ''}>
                  <Trans>Theoretical answer</Trans>
                </label>
              </FloatLabel>
              {error && <small className="p-error">{error.message}</small>}
            </>
          )}
          rules={{
            required: t`* Answer is required`,
          }}
        />
      </div>
    ),
    trueOrFalse: (
      <div>
        <Controller
          control={control}
          name={`trueOrFalse.${currentQuestionIndex}.StudentChosenAnswer`}
          render={({ field, fieldState: { error } }) => {
            return (
              <>
                <div className="flex gap-2">
                  <RadioButton
                    checked={(field?.value?.studentAnswer || '') === 'true'}
                    className={error ? 'p-invalid' : ''}
                    inputId="true"
                    onChange={(event) =>
                      field.onChange({
                        correctAnswer: question?.questionCorrectAnswer,
                        givenMark:
                          event.value === question?.questionCorrectAnswer
                            ? marksPerQuestion
                            : 0,
                        marksPerQuestion,
                        questionId: question?.id || '',
                        studentAnswer: event.value,
                      })
                    }
                    value="true"
                  />
                  <label className={error ? 'p-error' : ''} htmlFor="true">
                    <Trans>True</Trans>
                  </label>
                  <RadioButton
                    checked={(field?.value?.studentAnswer || '') === 'false'}
                    className={error ? 'p-invalid' : ''}
                    inputId="false"
                    onChange={(event) =>
                      field.onChange({
                        correctAnswer: question?.questionCorrectAnswer,
                        givenMark:
                          event.value === question?.questionCorrectAnswer
                            ? marksPerQuestion
                            : 0,
                        marksPerQuestion,
                        questionId: question?.id || '',
                        studentAnswer: event.value,
                      })
                    }
                    value="false"
                  />
                  <label className={error ? 'p-error' : ''} htmlFor="false">
                    <Trans>False</Trans>
                  </label>
                </div>
                {error && <small className="p-error">{error.message}</small>}
              </>
            );
          }}
          rules={{
            required: t`* Answer is required`,
          }}
        />
      </div>
    ),
  };
  return (
    <div className="flex items-center justify-between">
      {questionTypeLiteralMapping[question?.questionType || 'default']}
      <Tag
        severity="contrast"
        value={
          marksPerQuestion + ' ' + t`Mark${marksPerQuestion > 1 ? 's' : ''}`
        }
      />
    </div>
  );
};

export default QuestionCell;
