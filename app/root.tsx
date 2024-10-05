import notFoundLottie from './assets/not_found.json';
import { FirebaseAuth } from './config/firebase';
import { useLogoutMutation } from './routes/login/services/mutates';
import { setUser } from './stores/AppStore';
import { t } from '@lingui/macro';
import { onAuthStateChanged } from 'firebase/auth';
import Lottie from 'lottie-react';
import { Button } from 'primereact/button';
import { Outlet, useRouteError } from 'react-router-dom';

export function Component() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FirebaseAuth]);

  return (
    <>
      <title>OEMS</title>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const navigate = useNavigate();
  const { mutate: Logout } = useLogoutMutation();
  const error = useRouteError();

  // console.log(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {
        // @ts-expect-error no error typing
        error?.status === 404 ? (
          <div className="relative ">
            <Lottie animationData={notFoundLottie} className="w-70vw h-70vh" />
            <div className="absolute top-70% left-15% flex gap-5">
              <Button
                icon="pi pi-home"
                label={t`Home`}
                onClick={() => navigate('/')}
              />
              <Button
                icon="pi pi-power-off"
                label={t`Log out`}
                onClick={() => Logout()}
                severity="contrast"
              />
            </div>
          </div>
        ) : null
      }
    </div>
  );
}
