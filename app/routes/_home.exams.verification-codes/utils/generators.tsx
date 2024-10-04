import { type TVerificationCodeList } from './types';
import { useGenerateNewVerificationCode } from '@/routes/_home.exams.verification-codes/services/mutate';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';

export const ActionBodyTemplate = (
  rowData: TVerificationCodeList & { courseId: string }
) => {
  const { courseId, studentId } = rowData;

  const { mutate } = useGenerateNewVerificationCode();
  return (
    <Button
      label={t`Regenerate`}
      onClick={() =>
        mutate(
          { courseId, studentId },
          {
            onError: () => {
              showToast({
                detail: t`Failed to regenerate the verification code`,
                severity: 'error',
                summary: t`Error`,
              });
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [QueryKeys.VERIFICATION_CODE_LIST, courseId],
              });
              showToast({
                detail: t`Regenerated successfully`,
                severity: 'success',
                summary: t`Success`,
              });
            },
          }
        )
      }
    />
  );
};
