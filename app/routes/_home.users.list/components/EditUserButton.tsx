import { useEditUserFromFirebase } from '../services/mutate';
import { type AddUserFormValues } from '@/routes/_home.users.list.new-user/services/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type TProps = {
  readonly userData: AddUserFormValues;
};

const EditUserButton = ({ userData }: TProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { isPending, mutate } = useEditUserFromFirebase();

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<AddUserFormValues>({
    defaultValues: {
      fullName: userData.fullName,
      id: userData.id,
      level: userData.level || '',
      password: userData.password,
      role: userData.role,
      // picture: userData.picture,
      userId: userData.userId || '',
    },
  });

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  const selectedRole = watch('role');

  const roles = [
    { label: t`Student`, value: 'student' },
    { label: t`Teacher`, value: 'teacher' },
    { label: t`Admin`, value: 'admin' },
  ];
  const levels = [
    { label: t`1st`, value: '1' },
    { label: t`2nd`, value: '2' },
    { label: t`3rd`, value: '3' },
    { label: t`4th`, value: '4' },
  ];

  return (
    <>
      <Dialog
        dismissableMask
        draggable={false}
        footer={
          <Button
            disabled={!isDirty}
            icon="pi pi-check"
            label={t`Save`}
            loading={isPending}
            onClick={handleSubmit((FormData) =>
              mutate(FormData, {
                onError: () => {
                  showToast({
                    detail: t`Failed to edit the user`,
                    severity: 'error',
                    summary: t`Error`,
                  });
                  setVisible(false);
                },

                onSuccess: () => {
                  showToast({
                    detail: t`User edited successfully`,
                    severity: 'success',
                    summary: t`Success`,
                  });
                  // Invalidate and refetch the users query to update the UI
                  queryClient.invalidateQueries({
                    queryKey: [QueryKeys.USERS_TABLE],
                  });
                  setVisible(false);
                },
              })
            )}
            type="submit"
          />
        }
        header={
          <div>
            <Trans>Edit User</Trans>
          </div>
        }
        onHide={() => {
          setVisible(false);
          reset();
        }}
        pt={{
          root: {
            className: 'w-50vw',
          },
        }}
        visible={visible}
      >
        {isPending ? (
          <ProgressSpinner
            pt={{
              root: { className: ' h-full flex justify-center' },
            }}
          />
        ) : (
          <form className="p-fluid flex gap-8">
            <div className="w-50% flex flex-col gap-7">
              <div className="field mt-5">
                <Controller
                  control={control}
                  name="role"
                  render={({ field, fieldState }) => (
                    <FloatLabel>
                      <Dropdown
                        inputId="role"
                        onChange={(event) => {
                          field.onChange(event.value);
                          if (event.value !== 'student') {
                            setValue('level', '');
                            setValue('userId', '');
                          }
                        }}
                        options={roles}
                        value={field.value}
                      />
                      <label htmlFor="role">
                        <Trans>Role</Trans>
                      </label>
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small>
                      )}
                    </FloatLabel>
                  )}
                  rules={{ required: t`Role is required` }}
                />
              </div>
              <div className="field">
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <FloatLabel>
                          <InputText id="fullName" {...field} />
                          <label htmlFor="fullName">
                            <Trans>Full Name</Trans>
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
                  rules={{ required: t`Full Name is required` }}
                />
              </div>

              <div className="field">
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <FloatLabel>
                          <Password inputId="password" toggleMask {...field} />
                          <label htmlFor="password">
                            <Trans>Password</Trans>
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
                      message: t`Password must be at least 6 characters`,
                      value: 6,
                    },
                    required: t`Password is required`,
                  }}
                />
              </div>
              <div className="field">
                <Controller
                  control={control}
                  defaultValue="@gmail.com"
                  name="email"
                  render={({ field, fieldState }) => {
                    return (
                      <FloatLabel>
                        <InputText id="email" {...field} />
                        <label htmlFor="email">{t`Email`}</label>
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </FloatLabel>
                    );
                  }}
                  rules={{
                    pattern: {
                      message: t`Invalid email address`,
                      value: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/u,
                    },
                    required: t`Email is required`,
                  }}
                />
              </div>
            </div>

            {selectedRole === 'student' && (
              <div className="w-50% flex flex-col gap-7">
                <div className="field mt-5">
                  <Controller
                    control={control}
                    name="level"
                    render={({ field, fieldState }) => (
                      <FloatLabel>
                        <Dropdown
                          inputId="level"
                          onChange={(event) => field.onChange(event.value)}
                          options={levels}
                          value={field.value}
                        />
                        <label htmlFor="level">
                          <Trans>Student Level</Trans>
                        </label>
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </FloatLabel>
                    )}
                    rules={{ required: t`Student level is required` }}
                  />
                </div>
                <div className="field">
                  <Controller
                    control={control}
                    name="userId"
                    render={({ field, fieldState }) => {
                      return (
                        <FloatLabel>
                          <InputText id="userId" {...field} />
                          <label htmlFor="userId">
                            <Trans>User ID</Trans>
                          </label>
                          {fieldState.error && (
                            <small className="p-error">
                              {fieldState.error.message}
                            </small>
                          )}
                        </FloatLabel>
                      );
                    }}
                    rules={{ required: t`User ID is required` }}
                  />
                </div>
              </div>
            )}
          </form>
        )}
      </Dialog>
      <Button
        className="p-button-rounded mr-2"
        icon="pi pi-pencil"
        onClick={() => setVisible(true)}
        severity="success"
      />
    </>
  );
};

export default EditUserButton;
