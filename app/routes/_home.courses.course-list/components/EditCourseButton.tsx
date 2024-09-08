import { useEditCourseFromFirebase } from '../services/mutate';
import { type CourseFormValues } from '../services/types';
import queryClient from '@/config/queryClient';
import { showToast } from '@/stores/AppStore';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type TProps = {
  readonly userData: CourseFormValues;
};

const EditCourseButton = ({ userData }: TProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { isPending, mutate } = useEditCourseFromFirebase();

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<CourseFormValues>({
    defaultValues: {
      courseLevel: userData.courseLevel,
      courseName: userData.courseName,
      courseTeacher: userData.courseTeacher,
      id: userData.id,
    },
  });

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  // const selectedRole = watch('role');

  // const roles = [
  //   { label: t`Student`, value: 'student' },
  //   { label: t`Teacher`, value: 'teacher' },
  //   { label: t`Admin`, value: 'admin' },
  // ];
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
                    detail: t`Failed to edit the course`,
                    severity: 'error',
                    summary: t`Error`,
                  });
                  setVisible(false);
                },

                onSuccess: () => {
                  showToast({
                    detail: t`course edited successfully`,
                    severity: 'success',
                    summary: t`Success`,
                  });
                  // Invalidate and refetch the users query to update the UI
                  queryClient.invalidateQueries({
                    queryKey: [QueryKeys.COURSES_LIST],
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
            <Trans>Edit Course</Trans>
          </div>
        }
        onHide={() => {
          setVisible(false);
          reset();
        }}
        pt={{
          root: {
            className: 'w-40vw h-95vh',
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
          <form className="p-fluid flex flex-col gap-8">
            {/* <div className="field mt-5">
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
                          setValue('course', '');
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
            </div> */}
            <div className="field mt-5">
              <Controller
                control={control}
                name="courseName"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FloatLabel>
                        <InputText id="courseName" {...field} />
                        <label htmlFor="courseName">{t`Course Name`}</label>
                      </FloatLabel>
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  );
                }}
                rules={{ required: t`Course Name is required` }}
              />
            </div>

            <div className="field">
              <Controller
                control={control}
                name="courseTeacher"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <FloatLabel>
                        <InputText id="courseTeacher" {...field} />
                        <label htmlFor="courseTeacher">{t`Course Teacher`}</label>
                      </FloatLabel>
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  );
                }}
                rules={{ required: t`Course Teacher is required` }}
              />
            </div>
            <div className="field">
              <Controller
                control={control}
                name="courseLevel"
                render={({ field, fieldState }) => (
                  <FloatLabel>
                    <Dropdown
                      inputId="courseLevel"
                      onChange={(event) => field.onChange(event.value)}
                      options={levels}
                      value={field.value}
                    />
                    <label htmlFor="courseLevel">
                      <Trans>Course Level</Trans>
                    </label>
                    {fieldState.error && (
                      <small className="p-error">
                        {fieldState.error.message}
                      </small>
                    )}
                  </FloatLabel>
                )}
                rules={{ required: t`Course level is required` }}
              />
            </div>
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

export default EditCourseButton;
