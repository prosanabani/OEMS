import { useExamDetails } from '../services/query';
import { t, Trans } from '@lingui/macro';
import { Divider } from 'primereact/divider';
import { ListBox } from 'primereact/listbox';
import { type SelectItem } from 'primereact/selectitem';
import { Tag } from 'primereact/tag';

const ExamStructure = () => {
  const { examId } = useParams();
  const { data: examDetails } = useExamDetails(examId || '');

  const examQuestionsFormatList: SelectItem[] = [
    {
      disabled: !examDetails?.examFormat.trueOrFalse.isIncluded,
      label: t` True / False Questions :
            ${examDetails?.examFormat.trueOrFalse.count} questions,
            ${examDetails?.examFormat.trueOrFalse.marksPerQuestion} mark(s) per
            question`,
    },
    {
      disabled: !examDetails?.examFormat.multipleChoice.isIncluded,
      label: t`Multiple Choice Questions:
            ${examDetails?.examFormat.multipleChoice.count} questions,
            ${examDetails?.examFormat.multipleChoice.marksPerQuestion} mark(s)
            per question`,
    },
    {
      disabled: !examDetails?.examFormat.theoretical.isIncluded,
      label: t`Theoretical Questions: 
            ${examDetails?.examFormat.theoretical.count} questions,
            ${examDetails?.examFormat.theoretical.marksPerQuestion} mark(s) per
            question`,
    },
  ];

  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Trans>Total Questions:</Trans>
          <Tag severity="info" value={examDetails?.examQuestions.length} />
        </div>
        <Divider layout="vertical" />
        <div className="flex items-center gap-2">
          <Trans>Passing Mark:</Trans>
          <Tag severity="danger" value={examDetails?.examPassMark} />
        </div>
        <Divider layout="vertical" />
        <div className="flex items-center gap-2">
          <Trans>Total Marks:</Trans>
          <Tag severity="success" value={examDetails?.examMark} />
        </div>
      </div>
      <ListBox options={examQuestionsFormatList} />
    </>
  );
};

export default ExamStructure;
