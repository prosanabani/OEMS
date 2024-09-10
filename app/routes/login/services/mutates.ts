import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Login mutation
export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
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
