export type TUser = {
  email: string;
  fullName: string;
  id?: string;
  level?: string;
  password: string;
  // picture: FileList | null;
  role: 'admin' | 'student' | 'teacher';
  userId?: string;
};
