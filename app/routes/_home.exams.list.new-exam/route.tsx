import Content from './components/Content';
import Footer from './components/Footer';
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
        footer={<Footer />}
        header={t`Create new Exam`}
        onHide={() => navigate('..')}
        pt={{
          root: {
            className: 'h-90vh',
          },
        }}
        visible
      >
        <Content />
      </Dialog>
    </Form>
  );
}
