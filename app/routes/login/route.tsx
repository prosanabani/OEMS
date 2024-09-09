import LogoutButton from './components/LogoutButton';
import { login } from './utils/functions';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export function Component() {
  const { handleSubmit, register } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} />
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: true })} type="password" />
      </div>
      <button type="submit">Login</button>

      <LogoutButton />
    </form>
  );
}
