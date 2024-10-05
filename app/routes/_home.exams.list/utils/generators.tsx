import DeleteButton from '../components/DeleteButton';
import { type TExamList } from '../types/examListType';
import { useUserInfo } from '@/services/userQueries';
import { t, Trans } from '@lingui/macro';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';

export const ActionBodyTemplate = (rowData: TExamList) => {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useUserInfo();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {userInfo?.role === 'admin' || userInfo?.role === 'teacher' ? (
        <div className="flex gap-2">
          <Button
            icon="pi pi-pencil"
            label={t`Edit`}
            onClick={() => navigate('edit', { state: rowData })}
            rounded
            severity="success"
          />

          <DeleteButton examId={rowData.id} />
        </div>
      ) : (
        <Button
          icon="pi pi-pencil"
          label={t`Start Exam`}
          onClick={() =>
            navigate('/exams/start-exam', {
              state: {
                courseId: rowData.courseId,
                examId: rowData.id,
              },
            })
          }
          severity="success"
        />
      )}
    </>
  );
};

const renderQuestionType = (
  typeName: string,
  typeDetails: {
    count: number;
    isIncluded: boolean;
    marksPerQuestion: number;
  }
) => {
  return (
    <Panel className="w-20vw" header={typeName} toggleable>
      <div className="p-field">
        <p>
          <strong>
            <Trans>Is Included:</Trans>
          </strong>{' '}
          {typeDetails.isIncluded ? (
            <Tag severity="success" value={t`Yes`} />
          ) : (
            <Tag severity="danger" value={t`No`} />
          )}
        </p>
        <p>
          <strong>
            <Trans>Marks per Question:</Trans>
          </strong>{' '}
          {typeDetails.marksPerQuestion}
        </p>
        <p>
          <strong>
            <Trans>Number of Questions:</Trans>
          </strong>{' '}
          {typeDetails.count}
        </p>
      </div>
    </Panel>
  );
};

export const ExamRowExpansion = (rowData: TExamList) => {
  const examFormat = rowData.examFormat;
  return (
    <div className="p-5">
      <div className="mb-2">
        <Trans>Exam Details :</Trans>
      </div>
      <Accordion>
        <AccordionTab header={t`Exam Description`}>
          <div>{rowData.examDescription}</div>
        </AccordionTab>
        <AccordionTab header={t`Exam Format`}>
          <div className="flex justify-between">
            {renderQuestionType(t`Theoretical`, examFormat?.theoretical)}
            {renderQuestionType(t`True or False`, examFormat?.trueOrFalse)}
            {renderQuestionType(t`Multiple Choice`, examFormat?.multipleChoice)}
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};
