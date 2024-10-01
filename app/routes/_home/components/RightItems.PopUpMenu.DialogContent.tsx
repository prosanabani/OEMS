import { useChangePasswordMutation } from '../services/mutate';
import { type ChangePasswordForm } from '../utils/types';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Controller, useForm, useWatch } from 'react-hook-form';

const DialogContent = () => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordForm>();
  const newPasswordWatch = useWatch({ control, name: 'newPassword' });

  // Firebase password change mutation
  const { isPending, mutate } = useChangePasswordMutation();

  const onSubmit = handleSubmit((data) => {
    const { newPassword } = data;
    mutate(newPassword, { onSuccess: () => reset() });
  });
  return (
    <form
      className="flex flex-col h-full items-center justify-between"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-8">
        <div className="field">
          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState }) => {
              return (
                <>
                  <FloatLabel>
                    <Password
                      feedback={false}
                      inputId="newPassword"
                      pt={{
                        input: {
                          className: 'w-27vw',
                        },
                      }}
                      toggleMask
                      {...field}
                      className={fieldState.error ? 'p-invalid' : ''}
                    />
                    <label htmlFor="newPassword">
                      <Trans>New password</Trans>
                    </label>
                  </FloatLabel>
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              );
            }}
            rules={{
              minLength: {
                message: t`Password must be at least 6 characters long`,
                value: 6,
              },
              required: t`New password is required`,
            }}
          />
        </div>
        <div className="field">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => {
              return (
                <>
                  <FloatLabel>
                    <Password
                      className={fieldState.error ? 'p-invalid' : ''}
                      feedback={false}
                      inputId="confirmPassword"
                      pt={{
                        input: {
                          className: 'w-27vw',
                        },
                      }}
                      toggleMask
                      {...field}
                    />
                    <label htmlFor="confirmPassword">
                      <Trans>Confirm Password</Trans>
                    </label>
                  </FloatLabel>
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              );
            }}
            rules={{
              required: t`Please confirm your password`,
              validate: (value) =>
                value === newPasswordWatch || t`Passwords do not match`,
            }}
          />
        </div>
      </div>
      <Button
        className="w-27vw"
        icon="pi pi-check"
        label={t`Change Password`}
        loading={isPending}
        type="submit"
      />
    </form>
  );
};

export default DialogContent;
