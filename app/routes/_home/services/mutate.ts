import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from 'firebase/auth';

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (newPassword: string) => {
      const user = FirebaseAuth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
      } else {
        showToast({
          detail: t`No user is signed in`,
          severity: 'error',
          summary: 'Error',
        });
      }
    },

    onError: (error) => {
      const errorMessages: Record<string, string> = {
        'auth/network-request-failed': t`Network error. Please check your connection and try again.`,
        'auth/requires-recent-login': t`You need to log in again before changing your password.`,
        'auth/too-many-requests': t`Too many requests. Please try again later.`,
        'auth/user-not-found': t`User not found. Please ensure you are logged in correctly.`,
        'auth/weak-password': t`The password is too weak. Please use a stronger password.`,
      };

      const errorMessage =
        // @ts-expect-error typings are wrong
        errorMessages[error.code] ||
        error.message ||
        t`An error occurred while changing the password`;

      showToast({
        detail: errorMessage,
        severity: 'error',
        summary: t`Error`,
      });
    },
    onMutate: async () => {
      showToast({
        detail: t`Updating password...`,
        severity: 'info',
        summary: 'Processing',
      });
    },
    onSuccess: () => {
      showToast({
        detail: t`Password changed successfully`,
        severity: 'success',
        summary: 'Success',
      });
    },
  });
};
