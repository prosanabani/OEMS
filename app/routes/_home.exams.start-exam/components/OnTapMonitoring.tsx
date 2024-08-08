import useBeepSound from '../hooks/useBeepSound';

const OnTapMonitoring = () => {
  const { playBeepSound, stopBeepSound } = useBeepSound();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        playBeepSound();
      } else if (document.visibilityState === 'visible') {
        stopBeepSound();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [playBeepSound, stopBeepSound]);

  return <div>OnTapMonitoring</div>;
};

export default OnTapMonitoring;
