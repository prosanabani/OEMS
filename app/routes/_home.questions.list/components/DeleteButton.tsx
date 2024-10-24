import { useDeleteQuestion } from '../services/mutate';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

type TProps = {
  readonly questionId: string;
};

const DeleteQuestionButton = ({ questionId }: TProps) => {
  const [Visible, setVisible] = useState<boolean>(false);

  const { isPending, mutate } = useDeleteQuestion();

  return (
    <>
      <ConfirmDialog
        accept={() => {
          mutate(questionId, {
            onError: () => {
              showToast({
                detail: t`Failed to delete the question`,
                severity: 'error',
                summary: t`Error`,
              });
              setVisible(false);
            },
            onSuccess: () => {
              showToast({
                detail: t`Question deleted successfully `,
                severity: 'success',
                summary: t`Success`,
              });
              // Invalidate and refetch the questions query to update the UI
              queryClient.invalidateQueries({
                queryKey: [QueryKeys.QUESTIONS_TABLE],
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

export default DeleteQuestionButton;
