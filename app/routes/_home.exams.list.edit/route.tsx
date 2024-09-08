import Content from './components/Content';
import Footer from './components/Footer';
import Form from './components/Form';
import { Dialog } from 'primereact/dialog';

export function Component() {
  return (
    <Form>
      <Dialog
        dismissableMask
        draggable={false}
        footer={<Footer />}
        header="Edit Exam"
        onHide={() => router.navigate('..')}
        visible
      >
        <Content />
      </Dialog>
    </Form>
  );
}
