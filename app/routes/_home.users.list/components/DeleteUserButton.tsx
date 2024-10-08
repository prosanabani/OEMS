import { useDeleteUserFromFirebase } from '../services/mutate';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

type TProps = {
  readonly id: string;
};

const DeleteUserButton = ({ id }: TProps) => {
  const [Visible, setVisible] = useState<boolean>(false);
  const { isPending, mutate } = useDeleteUserFromFirebase();

  return (
    <>
      <ConfirmDialog
        accept={() => {
          mutate(id, {
            onError: () => {
              showToast({
                detail: t`Failed to delete the user`,
                severity: 'error',
                summary: t`Error`,
              });
              setVisible(false);
            },
            onSuccess: () => {
              showToast({
                detail: t`User deleted successfully `,
                severity: 'success',
                summary: t`Success`,
              });
              // Invalidate and refetch the questions query to update the UI
              queryClient.invalidateQueries({
                queryKey: [QueryKeys.USERS_TABLE],
              });
              setVisible(false);
            },
          });
        }}
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
        loading={isPending}
        onClick={() => setVisible(true)}
        severity="danger"
      />
    </>
  );
};

export default DeleteUserButton;
