import { Dialog } from 'primereact/dialog';

export function Component() {
  // const { state } = useLocation();
  return (
    <Dialog
      dismissableMask
      draggable={false}
      header="Edit Exam"
      onHide={() => router.navigate('..')}
      visible
    >
      edit exam
    </Dialog>
  );
}
