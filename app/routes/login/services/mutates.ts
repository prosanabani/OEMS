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
    onError: (error) => {
      const loginErrorMessages: Record<string, string> = {
        'auth/account-exists-with-different-credential': t`An account already exists with a different credential.`,
        'auth/cancelled-popup-request': t`The popup sign in was canceled. Please try again.`,
        'auth/invalid-credential': t`The password is incorrect. Please try again.`,
        'auth/invalid-email': t`The email address is badly formatted.`,
        'auth/network-request-failed': t`Network error. Please check your connection and try again.`,
        'auth/operation-not-allowed': t`Password sign-in is not enabled. Please contact support.`,
        'auth/popup-closed-by-user': t`The popup was closed before completing the sign in. Please try again.`,
        'auth/too-many-requests': t`Too many login attempts. Please try again later.`,
        'auth/user-disabled': t`This user account has been disabled.`,
        'auth/user-not-found': t`No user found with this email.`,
      };
      const errorMessage =
        // @ts-expect-error typings are wrong
        loginErrorMessages[error.code] ||
        error.message ||
        t`An error occurred while logging in`;

      showToast({
        detail: errorMessage,
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
