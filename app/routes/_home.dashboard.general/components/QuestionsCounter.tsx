import { useQuestionsTable } from '../services/query'; // Assuming query.ts is in the same directory
import { Card } from 'primereact/card';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export default function QuestionsCounter() {
  const { data: questionsList } = useQuestionsTable('all'); // Fetch all questions

  // Calculate question counts based on data
  // Handle potential undefined data
  const aiGeneratedQuestionsCount =
    questionsList?.reduce((accumulator, question) => {
      return (
        accumulator +
        (question.aiGeneratedQuestions
          ? question.aiGeneratedQuestions.length
          : 0)
      );
    }, 0) || 0; // Initialize accumulator with 0
  // Count AI-generated questions within each question // Count AI-generated questions within each question
  const humanCreatedQuestionsCount = questionsList?.length;
  const totalQuestions =
    (humanCreatedQuestionsCount || 0) + aiGeneratedQuestionsCount;
  return (
    <div className="card p-5">
      <div className="flex flex-row justify-content-center gap-10">
        <Card
          className="mr-3 rounded-2xl w-30vw"
          title="Ai-Generated-Questions"
        >
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon className="i-hugeicons:artificial-intelligence-02 w-25px h-25px" />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-x-2">
              {aiGeneratedQuestionsCount}
            </span>
            <small> Questions</small>
          </p>
        </Card>

        <Card className="mr-3 rounded-2xl w-30vw" title="Normal-Questions">
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon className="i-quill:paper w-25px h-25px" />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-between">
              {humanCreatedQuestionsCount}
            </span>
            <small> Questions </small>
          </p>
        </Card>

        <Card className="rounded-2xl w-30vw" title="All-Questions">
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon className="i-fluent-mdl2:questionnaire-mirrored w-25px h-20px" />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-between">
              {totalQuestions}
            </span>
            <small> Questions</small>
          </p>
        </Card>
      </div>
    </div>
  );
}
