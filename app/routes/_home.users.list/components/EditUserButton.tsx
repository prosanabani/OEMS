import { AddUserFormValues } from '@/routes/_home.users.list.new-user/services/types';
import { useEditUserFromFirebase } from '../services/mutate';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Password } from 'primereact/password';

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
      id: userData.id,
      fullName: userData.fullName,
      role: userData.role,
      password: userData.password,
      level: userData.level || '',
      course: userData.course || '',
      // picture: userData.picture,
      userId: userData.userId || '',
    },
  });

  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const selectedRole = watch('role');

  const roles = [
    { label: t`Student`, value: 'student' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Admin', value: 'admin' },
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
                    detail: t`User Edited Successfully `,
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
                      // onChange={(event) => field.onChange(event.value)}
                      onChange={(event) => {
                        field.onChange(event.value);
                        console.log(event.value);
                        if (event.value !== 'student') {
                          setValue('course', '');
                          setValue('level', '');
                          setValue('userId', '');
                        }
                      }}
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
