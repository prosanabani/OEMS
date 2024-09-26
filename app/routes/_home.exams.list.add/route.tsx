import Content from './components/Content';
import Form from './components/Form';
import { t, Trans } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';

export function Component() {
  const navigate = useNavigate();

  return (
    <Form>
      <Dialog
        dismissableMask
        draggable={false}
        header={
          <div className="flex gap-2 items-center">
            <div>
              <Trans>Create new Exam</Trans>
            </div>
            <Message
              severity="info"
              text={t`Please make sure to fill out all the fields`}
            />
          </div>
        }
        onHide={() => navigate('..')}
        pt={{
          root: {
            className: 'h-90vh w-60vw',
          },
        }}
        visible
      >
        <Content />
      </Dialog>
    </Form>
  );
}
