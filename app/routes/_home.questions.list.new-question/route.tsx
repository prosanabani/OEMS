import DialogContent from './components/DialogContent';
import Form from './components/Form';
import { t } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';

export function Component() {
  const navigate = useNavigate();
  return (
    <Form>
      <Dialog
        dismissableMask
        draggable={false}
        header={t`Add new question`}
        onHide={() => navigate('/questions/list')}
        pt={{
          closeButtonIcon: {
            className: 'w-20 h-20',
          },
          root: {
            className: 'w-80vw h-90vh ',
          },
        }}
        visible
      >
        <DialogContent />
      </Dialog>
    </Form>
  );
}
