import { t } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';

export function Component() {
  const navigate = useNavigate();
  // const { state } = useLocation();

  return (
    <Dialog
      dismissableMask
      draggable={false}
      header={t`Add Questions to Exam`}
      onHide={() => navigate('..')}
      pt={{
        root: {
          className: 'h-90vh',
        },
      }}
      visible
    >
      .kcjdsnkjcdsk
    </Dialog>
  );
}
