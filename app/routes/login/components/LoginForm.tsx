// import Illustration from './Illustration';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FieldValues } from 'react-hook-form';

// type SubmitHandler<TFieldValues extends FieldValues> = (
//   data: TFieldValues,
//   event?: Event
// ) => void;

// const LoginForm = () => {
//   const {
//     formState: { errors },
//     handleSubmit,
//     register,
//   } = useForm();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const onSubmit = (data: FieldValues) => {
//     const { username, password } = data as {
//       username: string;
//       password: string;
//     };
//     console.log('Username:', username, 'Password:', password);
//     // ...
//   };

//   return (
//     <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
//       <div className="text-center mb-5">
//         <img
//           src="/demo/images/blocks/logos/hyper.svg"
//           alt="hyper"
//           height={50}
//           className="mb-3"
//         />
//         <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
//         <span className="text-600 font-medium line-height-3">
//           Don't have an account?
//         </span>
//         <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
//           Create today!
//         </a>
//       </div>

//       <div>
//         <label htmlFor="text" className="block text-900 font-medium mb-2">
//           <Username></Username>
//         </label>
//         <InputText
//           id="email"
//           type="text"
//           placeholder="Email address"
//           className="w-full mb-3"
//         />

//         <label htmlFor="password" className="block text-900 font-medium mb-2">
//           Password
//         </label>
//         <InputText
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3"
//         />

//         <div className="flex align-items-center justify-content-between mb-6">
//           <div className="flex align-items-center">
//             <Checkbox
//               id="rememberme"
//               className="mr-2"
//               checked={checked1}
//               onChange={(e) => setChecked1(e.checked)}
//             />
//             <label htmlFor="rememberme">Remember me</label>
//           </div>
//           <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
//             Forgot your password?
//           </a>
//         </div>

//         <Button label="Sign In" icon="pi pi-user" className="w-full" />
//       </div>
//     </div>
//   );
// };
// export default LoginForm;

// import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { FieldValues } from 'react-hook-form';

// const LoginForm: React.FC = () => {
//   const {
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     register,
//   } = useForm();

//   type LoginData = {
//     username: string;
//     password: string;
//     rememberMe: boolean;
//   };
//   const onSubmit = (data: FieldValues) => {
//     const loginData = data as LoginData;
//     // Handle login logic with loginData
//     console.log('Login data:', loginData);
//   };
//   const [rememberMe, setRememberMe] = useState(false);

//   return (
//     <div className="login-form">
//       <h2 className="text-2xl font-medium mb-6">Welcome Back</h2>
//       <p>Login to your account</p>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-3">
//           <label className="block mb-2 text-sm font-medium" htmlFor="username">
//             Username
//           </label>
//           <InputText
//             id="username"
//             placeholder="Username"
//             type="text"
//             {...register('username', { required: true })}
//           />
//           {errors.username && (
//             <p className="text-red-500 text-sm">Username is required</p>
//           )}
//         </div>
//         <div className="mb-3">
//           <label className="block mb-2 text-sm font-medium" htmlFor="password">
//             Password
//           </label>
//           <Password
//             id="password"
//             type="password"
//             {...register('password', { required: true })}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm">Password is required</p>
//           )}
//         </div>
//         <div className="mb-3 flex items-center">
//           <Checkbox
//             checked={rememberMe}
//             className="mr-2"
//             id="rememberMe"
//             name="rememberMe"
//             onChange={(event) => setRememberMe(event.target.checked ?? true)}
//           />
//           <label className="text-sm font-medium" htmlFor="rememberMe">
//             Remember Me
//           </label>
//         </div>
//         <Button
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           disabled={isSubmitting}
//           label="Login"
//           type="submit"
//         />
//       </form>
//     </div>
//   );
// };

// import React, { useState } from 'react';

// // Global styles (optional)

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Perform login validation and submission here
//     if (username === 'user' && password === 'password') {
//       setIsLoggedIn(true);
//     } else {
//       // Handle login failure
//       console.error('Invalid credentials');
//     }

//     if (isLoggedIn) {
//       // Render a logged-in message or perform an action
//       console.log('User is logged in');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-bold mb-2"
//             htmlFor="username"
//           >
//             Username:
//           </label>
//           <input
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//             id="username"
//             onChange={(event) => setUsername(event.target.value)}
//             required
//             type="text"
//             value={username}
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-bold mb-2"
//             htmlFor="password"
//           >
//             Password:
//           </label>
//           <input
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//             id="password"
//             onChange={(event) => setPassword(event.target.value)}
//             required
//             type="password"
//             value={password}
//           />
//         </div>
//         <button
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           type="submit"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// LoginPage.tsx
import logo from './OMES.png';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  password: string;
  role: 'admin' | 'student' | 'lecturer';
  username: string;
};

const LoginPage = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>();
  const [selectedRole, setSelectedRole] = useState<
    'admin' | 'student' | 'lecturer'
  >('admin');
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Add your login logic here
  };

  const handleRoleChange = (event: {
    value: 'admin' | 'student' | 'lecturer';
  }) => {
    setSelectedRole(event.value);
  };

  return (
    <div className="grid h-screen">
      <div className="col-6 bg-blue-500 text-white p-6">
        <div className="flex flex-column align-items-center justify-content-center h-full">
          <img alt="OMES Logo" className="mb-4" src={logo} />
          <h2 className="mb-4">OMES</h2>
          <Dropdown
            className="mb-4"
            onChange={handleRoleChange}
            options={['admin', 'student', 'lecturer']}
            placeholder="Select your role"
            value={selectedRole}
          />
          <form
            className="flex flex-column align-items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText
              placeholder={selectedRole === 'admin' ? 'Your Name' : 'Your ID'}
              {...register('username', { required: 'Username is required' })}
              className={`mb-2 ${errors.username ? 'p-invalid' : ''}`}
            />
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
            <InputText
              placeholder="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`mb-4 ${errors.password ? 'p-invalid' : ''}`}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            <Button label="Login" type="submit" />
          </form>
        </div>
      </div>
      <div
        className="col-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${logo})` }}
      />
    </div>
  );
};

export default LoginPage;
