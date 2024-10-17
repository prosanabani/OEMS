import useBeepSound from '../hooks/useBeepSound';
import { setCheatingAttempt } from '@/routes/exams.$examId.start-exam/store';
import { policies } from '@/utils/constants/policies';
import { useEffect, useRef } from 'react';

const OnTapMonitoring = () => {
  const { playBeepSound, stopBeepSound } = useBeepSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        playBeepSound();
        setCheatingAttempt('tabChange');

        // Set cheating attempt after 5 seconds if the user remains out of the tab
        timerRef.current = setInterval(() => {
          setCheatingAttempt('tabChange');
        }, policies.TabMonitoringCheatingTimeOut);
      } else if (document.visibilityState === 'visible') {
        stopBeepSound();

        // Clear the timer if the user returns to the tab within timeout
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [playBeepSound, stopBeepSound]);

  return null; // This component won't render anything
};

export default OnTapMonitoring;
