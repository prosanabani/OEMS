import useBeepSound from './useBeepSound';
import { setCheatingAttempt } from '@/routes/exams.$examId.start-exam/store';
import { policies } from '@/utils/constants/policies';
import { useEffect, useRef } from 'react';

export const useTabMonitoring = () => {
  const { playBeepSound, stopBeepSound } = useBeepSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        playBeepSound();
        setCheatingAttempt('tab-change');

        // Set cheating attempt after 5 seconds if the user remains out of the tab
        intervalRef.current = setInterval(() => {
          setCheatingAttempt('tab-change');
        }, policies.TabMonitoringCheatingTimeOut);
      } else if (document.visibilityState === 'visible') {
        stopBeepSound();

        // Clear the interval if the user returns to the tab within timeout
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [playBeepSound, stopBeepSound]);
};
