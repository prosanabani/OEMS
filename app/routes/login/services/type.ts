export type LoginUserFormValues = {
  // Use string for both user ID and full name
  password: string;
  role: 'admin' | 'teacher' | 'student';
  username: string;
  //   id.?: string;
};
