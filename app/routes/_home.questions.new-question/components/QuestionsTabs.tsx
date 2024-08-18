import MultiChoiceForm from './QuestionsTabs.MultiChoiceForm';
import TheoreticalQuestionForm from './QuestionsTabs.TheoreticalQuestionForm';
import TrueOrFalseForm from './QuestionsTabs.TrueOrFalseForm';
import { t } from '@lingui/macro';
import { TabPanel, TabView } from 'primereact/tabview';

const QuestionsTabs = () => {
  return (
    <TabView
      pt={{
        panelContainer: {
          className: 'p-40px h-110',
        },
      }}
    >
      <TabPanel header={t`Theoretical`}>
        <TheoreticalQuestionForm />
      </TabPanel>
      <TabPanel header={t`True Or False `}>
        <TrueOrFalseForm />
      </TabPanel>
      <TabPanel header={t`Multi Choice`}>
        <MultiChoiceForm />
      </TabPanel>
    </TabView>
  );
};

export default QuestionsTabs;
