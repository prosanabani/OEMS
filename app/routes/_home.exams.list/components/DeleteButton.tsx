import { useDeleteExam } from '../services/mutates';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

type TProps = {
  readonly examId: string;
};
const DeleteButton = ({ examId }: TProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { mutate } = useDeleteExam();

  return (
    <>
      <ConfirmDialog
        accept={() => {
          mutate(examId, {
            onError: () => {
              showToast({
                detail: t`Failed to delete the exam`,
                severity: 'error',
                summary: t`Error`,
              });
            },
            onSuccess: () => {
              showToast({
                detail: t`Exam deleted successfully `,
                severity: 'success',
                summary: t`Success`,
              });
              // Invalidate and refetch the questions query to update the UI
              queryClient.invalidateQueries({
                queryKey: [QueryKeys.EXAMS_TABLE],
              });
              setVisible(false);
            },
          });
        }}
        acceptClassName="p-button-danger"
        defaultFocus="reject"
        dismissableMask
        draggable={false}
        header={t` Are you sure you want to Delete ?`}
        icon="pi pi-exclamation-triangle text-red"
        message={
          <span className="p-error">
            <Trans>Exam will be deleted !</Trans>
          </span>
        }
        onHide={() => setVisible(false)}
        visible={visible}
      />
      <Button
        icon="pi pi-trash"
        onClick={() => setVisible(true)}
        rounded
        severity="danger"
      />
    </>
  );
};

export default DeleteButton;
