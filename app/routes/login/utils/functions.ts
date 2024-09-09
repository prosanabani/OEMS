import { t } from '@lingui/macro';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    localStorage.setItem('user', userCredential.user.uid);
    router.navigate('/dashboard');
    showToast({
      detail: t`Login success`,
      severity: 'success',
      summary: t`Success`,
    });
  } catch {
    showToast({
      detail: t`Login failed`,
      severity: 'error',
      summary: t`Error`,
    });
  }
};

export const Logout = async () => {
  try {
    await signOut(FirebaseAuth);
    localStorage.setItem('user', '');
    router.navigate('/login');
    showToast({
      detail: t`Logout success`,
      severity: 'success',
      summary: t`Success`,
    });
  } catch {
    showToast({
      detail: t`Logout failed`,
      severity: 'error',
      summary: t`Error`,
    });
  }
};
