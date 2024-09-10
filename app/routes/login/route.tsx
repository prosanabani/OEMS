import { useLoginMutation } from './services/mutates';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export function Component() {
  const { handleSubmit, register } = useForm<LoginFormValues>();
  const { mutate: Login } = useLoginMutation();

  //         Login({ email: data.email, password: data.password })

  return (
    <form
      onSubmit={handleSubmit((data) =>
        Login({ email: data.email, password: data.password })
      )}
    >
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} />
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: true })} type="password" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
