import MultiChoiceForm from './components/MultiChoiceForm';
import TheoreticalQuestionForm from './components/TheoreticalQuestionForm';
import TrueOrFalseForm from './components/TrueOrFalseForm';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';

export function Component() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="">
      <Button label={t`Add question`} onClick={() => setVisible(true)} />
      <Dialog
        closable={false}
        dismissableMask
        draggable={false}
        footer={
          <>
            <Button label={t`Create Question`} />
            <Button
              label={t`Cancel`}
              onClick={() => setVisible(false)}
              severity="danger"
            />
          </>
        }
        header={t`Add new question`}
        onHide={() => setVisible(false)}
        pt={{
          closeButtonIcon: {
            className: 'w-20 h-20',
          },
          root: {
            className: 'w-30vw ',
          },
        }}
        visible={visible}
      >
        <TabView>
          <TabPanel header={t`theoretical`}>
            <TheoreticalQuestionForm />
          </TabPanel>
          <TabPanel header={t`True Or False `}>
            <TrueOrFalseForm />
          </TabPanel>
          <TabPanel header={t`Multi Choice`}>
            <MultiChoiceForm />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
