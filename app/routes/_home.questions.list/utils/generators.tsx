/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteQuestionButton from '../components/DeleteButton';
import EditQuestionButton from '../components/EditQuestionButton';
import { type TFirebaseQuestion } from '../types/types';
import { t, Trans } from '@lingui/macro';
import { Tag } from 'primereact/tag';

export const ActionBodyTemplate = (rowData: TFirebaseQuestion) => {
  return (
    <>
      <EditQuestionButton questionData={rowData} />
      <DeleteQuestionButton questionId={rowData.id} />
    </>
  );
};

export const QuestionTypeBodyTemplate = (rowData: TFirebaseQuestion) => {
  const questionTypeObject: { [key: string]: JSX.Element } = {
    multipleChoice: <Tag severity="info" value="Multiple Choice" />,
    theoretical: <Tag severity="warning" value="Theoretical" />,
    trueOrFalse: <Tag severity="success" value="True or False" />,
  };
  return <div>{questionTypeObject[rowData.questionType || '']}</div>;
};

export const AnswersTemplate = (rowData: TFirebaseQuestion) => {
  const AnswerTemplateObject: { [key: string]: JSX.Element } = {
    multipleChoice: (
      <>
        {rowData?.questionAnswers
          ?.split(',')
          ?.map((answer: string) => (
            <Tag key={answer} severity="info" value={answer} />
          ))}
      </>
    ),
    theoretical: <Tag severity="warning" value="User own Input" />,
    trueOrFalse: (
      <>
        <Tag severity="success" value={t`T`} />
        <Trans>and</Trans>
        <Tag severity="danger" value={t`F`} />
      </>
    ),
  };
  return (
    <div className="flex gap-2 items-center  ">
      {AnswerTemplateObject[rowData.questionType || '']}
    </div>
  );
};

export const CorrectAnswerBodyTemplate = (rowData: TFirebaseQuestion) => {
  const AnswerTemplateObject: { [key: string]: JSX.Element } = {
    multipleChoice: (
      <Tag severity="info" value={rowData.questionCorrectAnswer} />
    ),
    theoretical: <Tag severity="warning" value={t`Teacher own correction`} />,
    trueOrFalse: (
      <Tag
        severity={
          rowData.questionCorrectAnswer === 'true' ? 'success' : 'danger'
        }
        value={rowData.questionCorrectAnswer}
      />
    ),
  };
  return <>{AnswerTemplateObject[rowData.questionType || '']}</>;
};
