/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmPopUP = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button
        icon="pi pi-trash"
        onClick={() => {
          setVisible(true);
        }}
        outlined
        rounded
        severity="danger"
      />
      <ConfirmDialog
        accept={() =>
          showToast({ detail: 'You have accepted', severity: 'success' })
        }
        icon="i-fluent:delete-32-light w-1em h-1em"
        message={t`Are you sure you want delete this user?`}
        onHide={() => setVisible(false)}
        reject={() =>
          showToast({ detail: 'You have rejected', severity: 'warn' })
        }
        visible={visible}
      />
    </>
  );
};

export default ConfirmPopUP;
