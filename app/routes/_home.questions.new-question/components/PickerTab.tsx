import { useNewQuestionStore } from '../store';
import { t } from '@lingui/macro';
import { PickList, type PickListChangeEvent } from 'primereact/picklist';

const PickerTab = () => {
  // if (location.state) {
  //   console.log(location.state);
  // }

  const generatedQuestions = useNewQuestionStore(
    (state) => state.generatedQuestions
  );

  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);

  useEffect(() => {
    if (generatedQuestions) {
      setSource(generatedQuestions);
    }
  }, [generatedQuestions]);

  const itemTemplate = (item: { question: string }) => {
    return <div className="flex item-center">{item.question}</div>;
  };

  console.log(source);

  // see the picker doc

  return (
    <div className="">
      <PickList
        className="w-50vw m-auto"
        dataKey="id"
        itemTemplate={itemTemplate}
        onChange={(event: PickListChangeEvent) => {
          setSource(event.source);
          setTarget(event.target);
        }}
        pt={{
          list: {
            className: ' h-50vh',
          },
        }}
        source={source}
        sourceHeader={t`Generated`}
        target={target}
        targetHeader={t`Selected`} // targetStyle={{ height: '24rem' }}
      />
    </div>
  );
};

export default PickerTab;
