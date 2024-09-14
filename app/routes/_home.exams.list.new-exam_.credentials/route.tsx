import Content from './components/Content';
import Footer from './components/Footer';
import Form from './components/Form';
import { t, Trans } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';

export function Component() {
  const navigate = useNavigate();

  const { state } = useLocation();

  return (
    <Form>
      <Dialog
        dismissableMask
        draggable={false}
        footer={<Footer />}
        header={
          <div className="flex items-center justify-between gap-5 mr-5">
            <div>
              <Trans>Fill Exam Credentials</Trans>
            </div>
            <Message
              icon="pi pi-info-circle"
              severity="info"
              text={t`Total Marks : ${state.examMark}`}
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
