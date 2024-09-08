import useNewQuestionData from '../services/query';
import { setTargetQuestionsToAdd, useNewQuestionStore } from '../store';
import { type TFormQuestions } from './Form';
import { t } from '@lingui/macro';
import { Divider } from 'primereact/divider';
import { PickList, type PickListChangeEvent } from 'primereact/picklist';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormContext } from 'react-hook-form';

const PickerTab = () => {
  const targetQuestionsToAdd = useNewQuestionStore(
    (state) => state.targetQuestionsToAdd
  );
  const [source, setSource] = useState<
    Array<
      | {
          choices: string;
          id: number;
          question: string;
        }
      | {
          choices?: string | undefined;
          question: string;
        }
    >
  >([]);

  const itemTemplate = (item: {
    id: number;
    question: string;
    questionAnswers: string;
  }) => {
    return (
      <>
        <div className="flex flex-col gap-1">
          <div className=" text-blue">{item.question}</div>
          <div className="flex gap-4 ">
            {item.questionAnswers &&
              item.questionAnswers.split(',').map((choice, index) => (
                <div key={index}>
                  {index + 1}. {choice}
                </div>
              ))}
          </div>
        </div>
        <Divider />
      </>
    );
  };

  const { watch } = useFormContext<TFormQuestions>();

  const { data, isLoading } = useNewQuestionData(watch());

  useEffect(() => {
    if (data !== undefined) {
      setSource(data.generatedQuestions);
    }
  }, [data, isLoading]);

  return (
    <>
      {source && !isLoading ? (
        <PickList
          dataKey="id"
          itemTemplate={itemTemplate}
          onChange={(event: PickListChangeEvent) => {
            setSource(event.source);
            setTargetQuestionsToAdd(event.target);
          }}
          pt={{
            list: {
              className: 'h-full ',
            },
            listWrapper: {
              className: 'mt-[3vw]',
            },
            root: {
              className: 'h-full',
            },
          }}
          showSourceControls={false}
          showTargetControls={false}
          source={source}
          sourceHeader={t`Generated`}
          target={targetQuestionsToAdd}
          targetHeader={t`Selected`}
        />
      ) : (
        <div className="flex mt-25vh">
          <ProgressSpinner />
        </div>
      )}
    </>
  );
};

export default PickerTab;
