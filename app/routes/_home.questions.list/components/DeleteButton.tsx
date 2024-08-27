import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

type TProps = {
  readonly questionId: string;
};

const DeleteQuestionButton = ({ questionId }: TProps) => {
  const [Visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <ConfirmDialog
        accept={() => console.log(questionId)}
        acceptClassName="p-button-danger"
        defaultFocus="reject"
        draggable={false}
        header={t` Are you sure you want to Delete ?`}
        icon="pi pi-exclamation-triangle text-red"
        message={
          <span className="p-error">
            <Trans>Question will be deleted !</Trans>
          </span>
        }
        onHide={() => setVisible(false)}
        visible={Visible}
      />
      <Button
        className="p-button-rounded mr-2"
        icon="pi pi-trash"
        onClick={() => setVisible(true)}
        severity="danger"
      />
    </>
  );
};

export default DeleteQuestionButton;
