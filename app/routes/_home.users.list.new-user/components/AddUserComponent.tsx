import useAddUser from '../services/query';
import { type AddUserFormValues } from '../services/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

const AddUserComponent = () => {
  const { control, handleSubmit, watch } = useForm<AddUserFormValues>();

  const navigate = useNavigate();

  const { isPending, mutate } = useAddUser();

  const onSubmit = (data: AddUserFormValues) => {
    mutate(data, {
      onError: () => {
        showToast({
          detail: t`Error adding document`,
          severity: 'error',
          summary: t`Error`,
        });
      },
      onSuccess: () => {
        showToast({
          detail: t`User added successfully`,
          severity: 'success',
          summary: t`Success`,
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.USERS_TABLE],
        });
        navigate('..');
      },
    });
  };

  const selectedRole = watch('role');

  return (
    <Dialog
      draggable
      footer={
        <Button
          className="mt-2"
          label={t`Submit`}
          loading={isPending}
          onClick={handleSubmit(onSubmit)}
          type="submit"
        />
      }
      header={
        <div className="flex items-center gap-2">
          <div className="i-solar:user-linear w-1em h-1em" />
          <div className="">{t`New User`}</div>
        </div>
      }
      onHide={() => navigate('..')}
      pt={{
        root: {
          className: 'w-50vw h-100vh',
        },
      }}
      visible
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
                      onChange={(event) => field.onChange(event.value)}
                      options={roles}
                      value={field.value}
                    />
                    <label htmlFor="role">{t`Role`}</label>
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
                        <label htmlFor="fullName">{t`Full Name`}</label>
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
                        <label htmlFor="password">{t`Password`}</label>
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
                      <label htmlFor="role">
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
                        <label htmlFor="userId">{t`User ID`}</label>
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
  );
};

export default AddUserComponent;
