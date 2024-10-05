import { useChangePasswordMutation } from '../services/mutate';
import { type ChangePasswordForm } from '../utils/types';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Controller, useForm, useWatch } from 'react-hook-form';

const validatePassword = (value: string) => {
  return {
    digit: /\d/u.test(value),
    length: value?.length >= 6,
    lowercase: /[a-z]/u.test(value),
    specialChar: /[!#$%&*@^]/u.test(value),
    uppercase: /[A-Z]/u.test(value),
  };
};

const ChangePassword = () => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordForm>();
  const newPasswordWatch = useWatch({ control, name: 'newPassword' });

  // Firebase password change mutation
  const { isPending, mutate } = useChangePasswordMutation();

  const onSubmit = handleSubmit((data) => {
    const { newPassword } = data;
    mutate(newPassword, { onSuccess: () => reset() });
  });

  // Function to check each rule

  const passwordRules = validatePassword(newPasswordWatch);

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
                      className={classNames({ 'p-invalid': fieldState.error })}
                      feedback
                      footer={
                        <div className="password-footer mt-2">
                          <div className="password-rules">
                            <div className="rule-item d-flex align-items-center">
                              <i
                                className={classNames('pi', {
                                  'pi-check text-success': passwordRules.length,
                                  'pi-times text-danger': !passwordRules.length,
                                })}
                              />
                              <span className="ml-2">{t`At least 6 characters long`}</span>
                            </div>
                            <div className="rule-item d-flex align-items-center">
                              <i
                                className={classNames('pi', {
                                  'pi-check text-success':
                                    passwordRules.uppercase,
                                  'pi-times text-danger':
                                    !passwordRules.uppercase,
                                })}
                              />
                              <span className="ml-2">{t`At least one uppercase letter (A-Z)`}</span>
                            </div>
                            <div className="rule-item d-flex align-items-center">
                              <i
                                className={classNames('pi', {
                                  'pi-check text-success':
                                    passwordRules.lowercase,
                                  'pi-times text-danger':
                                    !passwordRules.lowercase,
                                })}
                              />
                              <span className="ml-2">{t`At least one lowercase letter (a-z)`}</span>
                            </div>
                            <div className="rule-item d-flex align-items-center">
                              <i
                                className={classNames('pi', {
                                  'pi-check text-success': passwordRules.digit,
                                  'pi-times text-danger': !passwordRules.digit,
                                })}
                              />
                              <span className="ml-2">{t`At least one digit (0-9)`}</span>
                            </div>
                            <div className="rule-item d-flex align-items-center">
                              <i
                                className={classNames('pi', {
                                  'pi-check text-success':
                                    passwordRules.specialChar,
                                  'pi-times text-danger':
                                    !passwordRules.specialChar,
                                })}
                              />
                              <span className="ml-2">{t`At least one special character (!@#$%^&*)`}</span>
                            </div>
                          </div>
                        </div>
                      }
                      inputId="newPassword"
                      onChange={(event) => field.onChange(event)}
                      pt={{
                        input: {
                          className: 'w-27vw',
                        },
                      }}
                      toggleMask
                      value={field.value}
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
              required: t`New password is required`,
              validate: {
                digit: (value) =>
                  /\d/u.test(value) ||
                  t`Password must include at least one digit (0-9)`,
                length: (value) =>
                  value.length >= 6 ||
                  t`Password must be at least 6 characters long`,
                lowercase: (value) =>
                  /[a-z]/u.test(value) ||
                  t`Password must include at least one lowercase letter (a-z)`,
                specialChar: (value) =>
                  /[!#$%&*@^]/u.test(value) ||
                  t`Password must include at least one special character (!@#$%^&*)`,
                uppercase: (value) =>
                  /[A-Z]/u.test(value) ||
                  t`Password must include at least one uppercase letter (A-Z)`,
              },
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

export default ChangePassword;
