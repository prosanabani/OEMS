import { useGenerateNewVerificationCode } from '../_home.exams.verification-codes/services/mutate';
import { useVerificationCode } from './services/query';
import { useUserInfo } from '@/services/userQueries';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

export function Component() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { courseId, examId } = state;

  const { data: userInfo } = useUserInfo();
  const { data: verificationCode, isLoading } = useVerificationCode(
    courseId,
    userInfo?.id || ''
  );

  const { mutate } = useGenerateNewVerificationCode();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  return (
    <div className="flex flex-col gap-5 items-center">
      {verificationCode}
      <p>
        <Trans>Enter verification code</Trans>
      </p>
      <small>
        <Trans>Verification code will be given to you by your teacher</Trans>
      </small>
      <Controller
        control={control}
        name="verificationCode"
        render={({ field }) => {
          return (
            <>
              <div className="flex gap-2 items-center">
                <InputOtp
                  disabled={isLoading}
                  {...field}
                  autoFocus
                  integerOnly
                  invalid={Boolean(errors.verificationCode)}
                  length={6}
                  onChange={(event) => field.onChange(Number(event.value))}
                  variant="filled"
                />
                <Button
                  className="w-10"
                  icon="pi pi-refresh"
                  onClick={() => reset()}
                  severity="danger"
                />
              </div>
              {errors.verificationCode && (
                <small className="p-error">
                  {errors.verificationCode.message?.toString()}
                </small>
              )}
            </>
          );
        }}
        rules={{
          validate: (value: number) => {
            if (value?.toString().length !== 6) {
              return t`Verification code is short`;
            } else if (value !== verificationCode) {
              return t`Incorrect verification code`;
            }

            return true;
          },
        }}
      />
      <div className="flex justify-between items-center gap-12">
        <Button
          label={t`Request new one`}
          onClick={() => {}}
          severity="contrast"
        />
        <Button
          disabled={Boolean(errors.verificationCode) || isLoading}
          label={t`Enter exam`}
          loading={isLoading}
          onClick={handleSubmit((formData) => {
            mutate(
              { courseId, studentId: userInfo?.id || '' },
              {
                onError: () => {
                  showToast({
                    detail: t`Failed to enter exam`,
                    severity: 'error',
                    summary: t`Error`,
                  });
                },
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: [QueryKeys.VERIFICATION_CODE],
                  });
                  navigate(`/exams/${examId}/credentials`, {
                    state: {
                      verificationCode: formData.verificationCode,
                      ...state,
                    },
                  });
                  showToast({
                    detail: t`Entered exam successfully`,
                    severity: 'success',
                    summary: t`Success`,
                  });
                },
              }
            );
          })}
          severity={errors.verificationCode && 'danger'}
          type="submit"
        />
      </div>
    </div>
  );
}
