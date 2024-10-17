import { toggleFullscreen } from '../utils/functions';
import useBeepSound from './useBeepSound';
import { setCheatingAttempt } from '@/routes/exams.$examId.start-exam/store';
import { policies } from '@/utils/constants/policies';
import { useEffect, useRef, useState } from 'react';

export const useFullScreenMonitoring = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { playBeepSound, stopBeepSound } = useBeepSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleFullscreenChange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      stopBeepSound();

      // Clear any existing interval when in fullscreen mode
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      playBeepSound();

      // Trigger cheating attempt every interval if not in fullscreen
      intervalRef.current = setInterval(() => {
        setCheatingAttempt('full-screen');
      }, policies.FullScreenMonitoringCheatingTimeOut);
    }

    // Cleanup the interval when hook unmounts or if fullscreen changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isFullscreen, playBeepSound, stopBeepSound]);

  return { isFullscreen, toggleFullscreen };
};
