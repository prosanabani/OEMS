import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

const Confirmpopu = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const buttonElement = useRef(null);

  const accept = () => {
    toast.current?.show({
      detail: 'You have accepted',
      life: 3_000,
      severity: 'success',
      summary: 'Confirmed',
    });
  };

  const reject = () => {
    toast.current?.show({
      detail: 'You have rejected',
      life: 3_000,
      severity: 'warn',
      summary: 'Rejected',
    });
  };

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
      <Toast ref={toast} />
      <ConfirmPopup
        accept={accept}
        icon="i-fluent:delete-32-light w-1em h-1em"
        message="Are you sure you want delete this user?"
        onHide={() => setVisible(false)}
        reject={reject}
        target={buttonElement.current}
        visible={visible}
      />
    </>
  );
};

export default Confirmpopu;
