import login_1 from './assets/login_2.json';
import { useLoginMutation } from './services/mutates';
import { type LoginUserFormValues } from './services/type';
import { t } from '@lingui/macro';
import Lottie from 'lottie-react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';

export function Component() {
  const { isPending, mutate: Login } = useLoginMutation();

  const roles = [
    { label: t`Admin`, value: 'admin' },
    { label: t`Teacher`, value: 'teacher' },
    { label: t`Student`, value: 'student' },
  ];

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<LoginUserFormValues>({
    defaultValues: {
      role: 'admin',
    },
  });

  const selectedRole = watch('role');
  return (
    <div className="flex h-100vh w-100vw items-center justify-center">
      <div className="flex items-center w-80vw h-80vh rounded-xl shadow-2xl">
        <div className="bg-blue h-full w-50% flex flex-col gap-20 items-center justify-center rounded-xl">
          <div className="">
            <Message
              icon="i-tabler:lock w-7 h-7 bg-white"
              pt={{
                text: {
                  className: 'text-2xl text-white',
                },
              }}
              severity="contrast"
              text={t`LOGIN`}
            />
          </div>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit((FormData) => {
              const currentField =
                FormData.role === 'student'
                  ? FormData.userId
                  : FormData.username;
              return Login({
                password: FormData.password,
                role: FormData.role,
                username: currentField,
              });
            })}
          >
            <div className="">
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <>
                    <FloatLabel>
                      <Dropdown
                        className="w-full"
                        inputId="role"
                        onChange={(event) => {
                          field.onChange(event.value);
                          setValue('password', '');
                          setValue('userId', '');
                          setValue('username', '');
                        }}
                        options={roles}
                        value={field.value}
                      />
                      <label htmlFor="role">{t`Role`}</label>
                    </FloatLabel>
                    {errors.role && (
                      <small className="p-error">{errors.role.message}</small>
                    )}
                  </>
                )}
                rules={{ required: t`Role is required` }}
              />
            </div>
            {selectedRole && (
              <>
                {selectedRole === 'student' ? (
                  <div className="">
                    <Controller
                      control={control}
                      name="userId"
                      render={({ field }) => (
                        <>
                          <FloatLabel>
                            <InputText
                              className={
                                errors.userId ? 'p-invalid w-full' : 'w-full'
                              }
                              keyfilter="int"
                              {...field}
                            />
                            <label htmlFor="userId">{t`User ID`}</label>
                          </FloatLabel>
                          {errors.userId && (
                            <small className="p-error">
                              {errors.userId.message}
                            </small>
                          )}
                        </>
                      )}
                      rules={{
                        required: t`User ID is required`,
                      }}
                    />
                  </div>
                ) : (
                  <div className="">
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <>
                          <FloatLabel>
                            <InputText
                              className={
                                errors.username ? 'p-invalid w-full' : 'w-full'
                              }
                              {...field}
                            />
                            <label htmlFor="username">{t`Full Name`}</label>
                          </FloatLabel>
                          {errors.username && (
                            <small className="p-error">
                              {errors.username.message}
                            </small>
                          )}
                        </>
                      )}
                      rules={{ required: t`Full Name is required` }}
                    />
                  </div>
                )}

                <div className="">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <div className="flex flex-col ">
                        <FloatLabel>
                          <Password
                            className={errors.password ? 'p-invalid' : ''}
                            feedback={false}
                            pt={{
                              input: {
                                className: 'w-32vw',
                              },
                            }}
                            toggleMask
                            {...field}
                            type="password"
                          />
                          <label htmlFor="password">{t`Password`}</label>
                        </FloatLabel>
                        {errors.password && (
                          <small className="p-error">
                            {errors.password.message}
                          </small>
                        )}
                      </div>
                    )}
                    rules={{ required: t`Password is required` }}
                  />
                </div>
              </>
            )}
            <Button
              disabled={!isDirty}
              label={isPending ? t`logging in...` : t`Login`}
              loading={isPending}
              severity={isValid ? undefined : 'danger'}
              type="submit"
            />
          </form>
        </div>

        <div className="w-40vw p-20 aspect-ratio-square ">
          <Lottie animationData={login_1} />
        </div>
      </div>
    </div>
  );
}
