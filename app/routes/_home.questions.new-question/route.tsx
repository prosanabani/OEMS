import DialogContent from './components/DialogContent';
import Form from './components/Form';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export function Component() {
  const [visible, setVisible] = useState(true);

  return (
    <Form>
      <Button label={t`Add question`} onClick={() => setVisible(true)} />
      <Dialog
        dismissableMask
        draggable={false}
        header={t`Add new question`}
        onHide={() => setVisible(false)}
        pt={{
          closeButtonIcon: {
            className: 'w-20 h-20',
          },
          root: {
            className: 'w-80vw h-90vh ',
          },
        }}
        visible={visible}
      >
        <DialogContent />
      </Dialog>
    </Form>
  );
}
