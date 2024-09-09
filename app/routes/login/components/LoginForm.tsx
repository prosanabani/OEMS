// import logo1 from '../logo1.jpg';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import { FloatLabel } from 'primereact/floatlabel';
// import { InputText } from 'primereact/inputtext';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// type User = {
//   password: string;
//   username: string;
// };

// type Role = 'admin' | 'student' | 'lecturer';

// export default function LoginForm() {
//   const [selectedRole, setSelectedRole] = useState<Role>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate(); // Utilize useNavigate for navigation

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const handleLogin = async (data: User) => {
//     // Prevent default form submission
//     event.preventDefault();

//     // Replace this with your actual login logic (API call, etc.)
//     console.log(
//       'Login clicked! Username:',
//       data.username,
//       'Password:',
//       data.password
//     );

//     setLoading(true);

//     try {
//       // Simulate successful login after 1 second
//       await new Promise((resolve) => setTimeout(resolve, 1_000));

//       // Handle successful login: navigate to "_home" page
//       navigate('/dashboard'); // Replace with your actual home route path

//       console.log('Login successful!');
//     } catch (error) {
//       // Handle login errors
//       console.error('Login failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedRole(event.target.value as Role);
//   };

//   const renderUsernameField = () => {
//     switch (selectedRole) {
//       case 'admin':
//       case 'lecturer':
//         return (
//           <div className="mb-10">
//             <FloatLabel>
//               <InputText
//                 className="w-full pi-pi-user"
//                 {...control.register('username', {
//                   required: 'Username is required',
//                 })}
//                 placeholder="Enter Name"
//               />
//               <label htmlFor="username">Name</label>
//               {errors.username && (
//                 <span className="error">{errors.username.message}</span>
//               )}
//             </FloatLabel>
//           </div>
//         );
//       case 'student':
//         return (
//           <div className="mb-10">
//             <FloatLabel>
//               <InputText
//                 className="w-full pi-pi-user"
//                 {...control.register('username', {
//                   required: 'Username is required',
//                   type: 'number', // Set type validation for student
//                 })}
//                 placeholder="Enter User ID"
//                 type="number"
//               />
//               <label htmlFor="username">User ID</label>
//               {errors.username && (
//                 <span className="error">{errors.username.message}</span>
//               )}
//             </FloatLabel>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const roles = [
//     { label: 'Admin', value: 'admin' },
//     { label: 'Student', value: 'student' },
//     { label: 'Lecturer', value: 'lecturer' },
//   ];

//   return (
//     <div className="login-container flex h-min-screen bg-red-7 rounded-3xl">
//       <form
//         className="w-180 font-medium bg-gray-100 text-black-800 rounded-tl-2xl rounded-bl-2xl p-30"
//         onSubmit={handleSubmit(handleLogin)}
//       >
//         <h2 className="text-4xl text-blue-700 font-bold ">Welcome Back</h2>
//         <div className="mb-10">
//           <label className="block text-sm font-medium mb-2" htmlFor="role">
//             Choose Role:
//           </label>
//           <Dropdown
//             className="w-full"
//             id="role"
//             name="role" // Not needed with useForm, handled by control.register
//             onChange={handleChangeRole}
//             options={roles}
//             value={selectedRole}
//           />
//         </div>

//         {renderUsernameField()}

//         <div className="mb-10">
//           <FloatLabel>
//             <InputText
//               className="w-full"
//               {...control.register('password', {
//                 minLength: 8,
//                 required: 'Password is required', // Set minimum password length
//               })}
//               placeholder="Enter Password"
//             />
//             <label htmlFor="password">Password</label>
//             {errors.password && (
//               <span className="error">{errors.password.message}</span>
//             )}
//           </FloatLabel>
//         </div>

//         <Button className="w-full" label="Login" loading={loading} />
//       </form>

//       <img
//         alt="Placeholder"
//         className="h-min-screen object-cover rounded-tr-2xl rounded-br-2xl "
//         src={logo1}
//       />
//     </div>
//   );
// }

// LoginForm.tsx
// import logo1 from '../logo1.jpg';
// // import { FirebaseDatabase } from 'firebase/database'; // Adjust the import path as necessary
// import { doc, getDoc } from 'firebase/firestore';
// import { Button } from 'primereact/button';
// import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
// import { FloatLabel } from 'primereact/floatlabel';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// type User = {
//   password: string;
//   username: string;
// };

// type Role = 'admin' | 'student' | 'lecturer';

// export default function LoginForm() {
//   const [selectedRole, setSelectedRole] = useState<Role>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const {
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<User>(); // Initialize useForm hook

//   const handleLogin = async (data: User) => {
//     setLoading(true);
//     setErrorMessage(null); // Reset error message

//     try {
//       const userDocument = await getDoc(
//         doc(FirebaseDatabase, 'users', data.username)
//       );

//       if (userDocument.exists()) {
//         const userData = userDocument.data();
//         // Compare the input password with the stored password
//         if (data.password === userData.password) {
//           console.log('Login successful!');
//           // Handle successful login (e.g., redirect to another page)
//         } else {
//           setErrorMessage('Invalid password. Please try again.');
//         }
//       } else {
//         setErrorMessage('Sorry, user not found.');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setErrorMessage('An error occurred while logging in. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeRole = (event: DropdownChangeEvent) => {
//     setSelectedRole(event.target.value as Role);
//   };

//   const renderUsernameField = () => {
//     switch (selectedRole) {
//       case 'admin':
//       case 'lecturer':
//         return (
//           <div className="mb-10">
//             <FloatLabel>
//               <InputText
//                 className="w-full pi-pi-user"
//                 {...control.register('username', {
//                   required: 'Username is required',
//                 })}
//                 placeholder="Enter Name"
//               />
//               <label htmlFor="username">Name</label>
//               {errors.username && (
//                 <span className="error">{errors.username.message}</span>
//               )}
//             </FloatLabel>
//           </div>
//         );
//       case 'student':
//         return (
//           <div className="mb-10">
//             <FloatLabel>
//               <InputText
//                 className="w-full pi-pi-user"
//                 {...control.register('username', {
//                   pattern: {
//                     message: 'User ID must be numeric',
//                     value: /^\d+$/u,
//                   },
//                   required: 'User ID is required',
//                 })}
//                 placeholder="Enter User ID"
//                 type="number"
//               />
//               <label htmlFor="username">User ID</label>
//               {errors.username && (
//                 <span className="error">{errors.username.message}</span>
//               )}
//             </FloatLabel>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const roles = [
//     { label: 'Admin', value: 'admin' },
//     { label: 'Student', value: 'student' },
//     { label: 'Lecturer', value: 'lecturer' },
//   ];

//   return (
//     <div className="login-container flex h-min-screen bg-red-700 rounded-3xl">
//       <form
//         className="w-180 font-medium bg-gray-100 text-black-800 rounded-tl-2xl rounded-bl-2xl p-30"
//         onSubmit={handleSubmit(handleLogin)}
//       >
//         <h2 className="text-4xl text-blue-700 font-bold">Welcome Back</h2>
//         <div className="mb-10">
//           <label className="block text-sm font-medium mb-2" htmlFor="role">
//             Choose Role:
//           </label>
//           <Dropdown
//             className="w-full"
//             id="role"
//             onChange={handleChangeRole}
//             options={roles}
//             value={selectedRole}
//           />
//         </div>

//         {renderUsernameField()}

//         <div className="mb-10">
//           <FloatLabel>
//             <InputText
//               className="w-full"
//               {...control.register('password', {
//                 minLength: {
//                   message: 'Password must be at least 8 characters long',
//                   value: 8,
//                 },
//                 required: 'Password is required',
//               })}
//               placeholder="Enter Password"
//               type="password"
//             />
//             <label htmlFor="password">Password</label>
//             {errors.password && (
//               <span className="error">{errors.password.message}</span>
//             )}
//           </FloatLabel>
//         </div>

//         {errorMessage && (
//           <span className="error text-red-600">{errorMessage}</span>
//         )}

//         <Button className="w-full" label="Login" loading={loading} />
//       </form>

//       <img
//         alt="Placeholder"
//         className="h-min-screen object-cover rounded-tr-2xl rounded-br-2xl"
//         src={logo1}
//       />
//     </div>
//   );
// }

import logo1 from '../logo1.jpg';
import { FirebaseDatabase } from '@/config/firebase'; // Adjust the import path as necessary
import { doc, getDoc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type User = {
  password: string;
  username: string;
};

type Role = 'admin' | 'student' | 'lecturer';

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<User>(); // Initialize useForm hook

  const handleLogin = async (data: User) => {
    setLoading(true);
    setErrorMessage(null); // Reset error message

    try {
      const users = await getDoc(doc(FirebaseDatabase, 'users', data.username));

      if (users.exists()) {
        const userData = users.data();
        // Compare the input password with the stored password
        if (data.password === userData.password) {
          console.log('Login successful!');
          // Handle successful login (e.g., redirect to another page)
        } else {
          setErrorMessage('Invalid password. Please try again.');
        }
      } else {
        setErrorMessage('Sorry, user not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = (event: DropdownChangeEvent) => {
    setSelectedRole(event.value as Role);
  };

  const renderUsernameField = () => {
    switch (selectedRole) {
      case 'admin':
      case 'lecturer':
        return (
          <div className="mb-10">
            <FloatLabel>
              <InputText
                className="w-full pi-pi-user"
                {...control.register('username', {
                  required: 'Username is required',
                })}
                placeholder="Enter Name"
              />
              <label htmlFor="username">Name</label>
              {errors.username && (
                <span className="error">{errors.username.message}</span>
              )}
            </FloatLabel>
          </div>
        );
      case 'student':
        return (
          <div className="mb-10">
            <FloatLabel>
              <InputText
                className="w-full pi-pi-user"
                {...control.register('username', {
                  pattern: {
                    message: 'User ID must be numeric',
                    value: /^\d+$/u,
                  },
                  required: 'User ID is required',
                })}
                placeholder="Enter User ID"
                type="number"
              />
              <label htmlFor="username">User ID</label>
              {errors.username && (
                <span className="error">{errors.username.message}</span>
              )}
            </FloatLabel>
          </div>
        );
      default:
        return null;
    }
  };

  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Student', value: 'student' },
    { label: 'Lecturer', value: 'lecturer' },
  ];

  return (
    <div className="login-container flex h-min-screen bg-red-700 rounded-3xl">
      <form
        className="w-180 font-medium bg-gray-100 text-black-800 rounded-tl-2xl rounded-bl-2xl p-30"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2 className="text-4xl text-blue-700 font-bold">Welcome Back</h2>
        <div className="mb-10">
          <label className="block text-sm font-medium mb-2" htmlFor="role">
            Choose Role:
          </label>
          <Dropdown
            className="w-full"
            id="role"
            onChange={handleChangeRole}
            options={roles}
            value={selectedRole}
          />
        </div>

        {renderUsernameField()}

        <div className="mb-10">
          <FloatLabel>
            <InputText
              className="w-full"
              {...control.register('password', {
                // minLength: {
                //   message: 'Password must be at least 8 characters long',
                //   // value: 8,
                // },
                required: 'Password is required',
              })}
              placeholder="Enter Password"
              type="password"
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </FloatLabel>
        </div>

        {errorMessage && (
          <span className="error text-red-600">{errorMessage}</span>
        )}

        <Button className="w-full" label="Login" loading={loading} />
      </form>

      <img
        alt="Placeholder"
        className="h-min-screen object-cover rounded-tr-2xl rounded-br-2xl"
        src={logo1}
      />
    </div>
  );
}
