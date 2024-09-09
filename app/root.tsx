import { Trans } from '@lingui/macro';
import { Outlet, useRouteError } from 'react-router-dom';

export function Component() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Firebase Auth listener for real-time authentication state changes
  //   onAuthStateChanged(FirebaseAuth, (user) => {
  //     if (!user && !localStorage.getItem('user')) {
  //       navigate('/login'); // If user is not authenticated, redirect to login
  //     }
  //   });

  // }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);

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
