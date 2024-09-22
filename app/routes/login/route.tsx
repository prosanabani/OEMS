import logo from './logo.jpg'; // Replace with your image path
import { useLoginMutation } from './services/mutates';
import { type LoginUserFormValues } from './services/type';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';

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
    <div className="h-screen flex justify-center items-center">
      <div className="container rounded-lg relative bg-gray-800 w-300 h-130 ">
        <img
          alt="Background Image"
          className="absolute top-0 left-0 w-full h-full object-fill rounded-lg"
          src={logo}
        />
        <div className=" relative z-10 object-fill ">
          <div className="rounded-lb-lg rounded-lt-lg w-116.5 h-32.5rem ">
            <div className="text-lg font-bold text-center mb-25">
              <h2>{t`Login`}</h2>
            </div>
            <form
              className="flex flex-col gap-10 text-black p-10"
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
                    <div className="">
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
                    <div className="">
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

                  <div className="">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FloatLabel>
                          <Password
                            feedback={false}
                            pt={{
                              input: {
                                className: 'w-28.25vw',
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
        </div>
      </div>
    </div>
  );
}
