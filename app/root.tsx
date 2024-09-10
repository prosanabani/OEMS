import { FirebaseAuth } from './config/firebase';
import { setUser } from './stores/AppStore';
import { Trans } from '@lingui/macro';
import { onAuthStateChanged } from 'firebase/auth';
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

export function ErrorBoundray() {
  const navigate = useNavigate();
  const error = useRouteError();

  // log error in sentry or other log service
  // eslint-disable-next-line no-console
  console.log(error);

  function logout() {
    // also remove tokens
    navigate('/login');
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>
        <Trans>Sorry, there is an error.</Trans>
      </h1>
      <div className="flex gap-3">
        <button onClick={() => navigate('/')} type="button">
          <Trans>Go to Home</Trans>
        </button>
        <button onClick={() => logout()} type="button">
          <Trans>Logout</Trans>
        </button>
      </div>
    </div>
  );
}
