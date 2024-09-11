import logo1 from './logo1.jpg';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';
import { LoginUserFormValues } from './services/type';
import { useLoginMutation } from './services/mutates';

export function Component() {
  const { mutate: Login } = useLoginMutation();

  const roles = [
    { label: t`Admin`, value: 'admin' },
    { label: t`Teacher`, value: 'teacher' },
    { label: t`Student`, value: 'student' },
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginUserFormValues>();

  const selectedRole = watch('role');

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full">
        <div className="bg-white shadow-lg rounded-tl-2xl rounded-bl-2xl p-8 w-1/2 ml-20 space-x-none">
          <h2 className="text-xl font-bold mb-10 text-center">{t`Login`}</h2>
          <form
            className="flex flex-col gap-6 mt-4 "
            onSubmit={handleSubmit((FormData) => {
              const currentField =
                FormData.role !== 'student'
                  ? FormData.username
                  : FormData.userId;
              return Login({
                username: currentField,
                password: FormData.password,
                role: FormData.role,
              });
            })}
          >
            <div className="mb-4">
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <FloatLabel>
                    <Dropdown
                      className="w-full"
                      inputId="role"
                      onChange={(event) => field.onChange(event.value)}
                      options={roles}
                      value={field.value}
                    />
                    <label htmlFor="role">{t`Role`}</label>
                  </FloatLabel>
                )}
              />
            </div>
            {selectedRole && (
              <>
                {selectedRole === 'student' ? (
                  <div className="mb-4">
                    <Controller
                      control={control}
                      name="userId"
                      render={({ field }) => (
                        <FloatLabel>
                          <InputText
                            className="w-full "
                            {...field}
                            placeholder="Enter User ID"
                          />
                          <label htmlFor="userId">{t`User ID`}</label>
                          {errors.userId && (
                            <small className="p-error">
                              {errors.userId.message}
                            </small>
                          )}
                        </FloatLabel>
                      )}
                      rules={{
                        pattern: {
                          message: t`User ID must be numeric`,
                          value: /^\d+$/u,
                        },
                        required: t`User ID is required`,
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <FloatLabel>
                          <InputText
                            className="w-full"
                            {...field}
                            placeholder="Enter Full Name"
                          />
                          <label htmlFor="username">{t`Full Name`}</label>
                          {errors.username && (
                            <small className="p-error">
                              {errors.username.message}
                            </small>
                          )}
                        </FloatLabel>
                      )}
                      rules={{ required: t`Full Name is required` }}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FloatLabel>
                        <Password
                          feedback={false}
                          pt={{
                            input: {
                              className: 'w-35vw',
                            },
                          }}
                          toggleMask
                          {...field}
                          placeholder="Enter Password"
                          type="password"
                        />
                        <label htmlFor="password">{t`Password`}</label>
                        {errors.password && (
                          <small className="p-error">
                            {errors.password.message}
                          </small>
                        )}
                      </FloatLabel>
                    )}
                    rules={{ required: t`Password is required` }}
                  />
                </div>
              </>
            )}
            <Button label={t`Login`} type="submit" />
          </form>
        </div>
        <img
          alt="Placeholder"
          className="object-cover rounded-tr-2xl rounded-br-2xl w-1/2 mr-20"
          src={logo1}
        />
      </div>
    </div>
  );
}
