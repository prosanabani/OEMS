import useAddUser from '../services/query';
import queryClient from '@/config/queryClient';
import { type CourseFormValues } from '@/routes/_home.courses.course-list/services/types';
import { showToast } from '@/stores/AppStore';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

const AddCourseComponent = () => {
  const { control, handleSubmit } = useForm<CourseFormValues>();

  const navigate = useNavigate();

  const { isPending, mutate } = useAddUser();

  const onSubmit = (data: CourseFormValues) => {
    mutate(data, {
      onError: () => {
        showToast({
          detail: t`Error adding Course`,
          severity: 'error',
          summary: t`Error`,
        });
      },
      onSuccess: () => {
        showToast({
          detail: t`Course added successfully`,
          severity: 'success',
          summary: t`Success`,
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.COURSES_LIST],
        });
        navigate('..');
      },
    });
  };

  // const selectedRole = watch('role');

  return (
    <Dialog
      draggable
      footer={
        <Button
          className="mt-2"
          label={t`Submit`}
          onClick={handleSubmit(onSubmit)}
          type="submit"
        />
      }
      header={
        <div className="flex items-center gap-2">
          <div className="i-hugeicons:course w-1em h-1em" />
          <div className="">{t`New Course`}</div>
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
  );
};

export default AddCourseComponent;
