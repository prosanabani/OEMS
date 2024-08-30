import useAddUser from '../services/query';
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
import { AddUserFormValues } from '../services/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';

const roles = [
  { label: 'Student', value: 'student' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Admin', value: 'admin' },
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
          detail: 'Error adding document',
          severity: 'error',
          summary: 'Error',
        });
      },
      onSuccess: () => {
        showToast({
          detail: 'User added successfully',
          severity: 'success',
          summary: 'Success',
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
          label="Submit"
          onClick={handleSubmit(onSubmit)}
          type="submit"
        />
      }
      header={
        <div className="flex items-center gap-2">
          <div className="i-solar:user-linear w-1em h-1em" />
          <div className="">New User</div>
        </div>
      }
      onHide={() => navigate('..')}
      pt={{
        root: {
          className: 'w-40vw h-90vh',
        },
      }}
      visible
    >
      {isPending ? (
        <ProgressSpinner />
      ) : (
        <form className="p-fluid flex flex-col gap-8">
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
                  <label htmlFor="role">Role</label>
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </FloatLabel>
              )}
              rules={{ required: 'Role is required' }}
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
                      <label htmlFor="fullName">Full Name</label>
                    </FloatLabel>
                    {fieldState.error && (
                      <small className="p-error">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                );
              }}
              rules={{ required: 'Full Name is required' }}
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
                      <label htmlFor="password">Password</label>
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
                  message: 'Password must be at least 6 characters',
                  value: 6,
                },
                required: 'Password is required',
              }}
            />
          </div>

          {selectedRole === 'student' && (
            <>
              <div className="field">
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
                        <label htmlFor="userId">User ID</label>
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </FloatLabel>
                    );
                  }}
                  rules={{ required: 'User ID is required' }}
                />
              </div>

              <div className="field">
                <Controller
                  control={control}
                  name="course"
                  render={({ field, fieldState }) => {
                    return (
                      <FloatLabel>
                        <InputText id="course" {...field} />
                        <label htmlFor="course">Course</label>
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </FloatLabel>
                    );
                  }}
                  rules={{ required: 'Course is required' }}
                />
              </div>
            </>
          )}
        </form>
      )}
    </Dialog>
  );
};

export default AddUserComponent;
