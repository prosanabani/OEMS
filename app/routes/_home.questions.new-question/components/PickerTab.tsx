import useNewQuestionData from '../services/query';
import { type TFormQuestions } from './Form';
import { t } from '@lingui/macro';
import { PickList, type PickListChangeEvent } from 'primereact/picklist';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormContext } from 'react-hook-form';

const PickerTab = () => {
  // const [generateQuestions, setGenerateQuestions] = useState([]);
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);

  const itemTemplate = (item: { question: string }) => {
    return <div className="flex item-center">{item.question}</div>;
  };

  const { watch } = useFormContext<TFormQuestions>();

  const { data, isLoading } = useNewQuestionData(watch());

  useEffect(() => {
    if (data !== undefined) {
      setSource(data);
    }
  }, [data, isLoading]);

  // see the picker doc

  return (
    <>
      {source && !isLoading ? (
        <PickList
          dataKey="id"
          itemTemplate={itemTemplate}
          onChange={(event: PickListChangeEvent) => {
            setSource(event.source);
            setTarget(event.target);
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
          source={source}
          sourceHeader={t`Generated`}
          target={target}
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
