import { getEmailByUserId as getEmailByUserName } from '../utils/functions';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type TPayload = {
  password: string;
  role: 'admin' | 'teacher' | 'student';
  username: string;
};
// Login mutation
export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: TPayload) => {
      const email =
        (await getEmailByUserName(payload.username, payload.role)) || '';
      await signInWithEmailAndPassword(FirebaseAuth, email, payload.password);
    },
    onError: () => {
      showToast({
        detail: t`Login failed`,
        severity: 'error',
        summary: t`Error`,
      });
    },
    onSuccess: () => {
      navigate('/dashboard');
      showToast({
        detail: t`Login success`,
        severity: 'success',
        summary: t`Success`,
      });
    },
  });
};

// Logout mutation
export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await signOut(FirebaseAuth);
    },
    onError: () => {
      showToast({
        detail: t`Logout failed`,
        severity: 'error',
        summary: t`Error`,
      });
    },
    onSuccess: () => {
      navigate('/login');
      showToast({
        detail: t`Logout success`,
        severity: 'success',
        summary: t`Success`,
      });
    },
  });
};
