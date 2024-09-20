export type LoginUserFormValues = {
  // Use string for both user ID and full name
  password: string;
  role: 'admin' | 'teacher' | 'student';
  userId: string;
  username: string;
  //   id.?: string;
};
