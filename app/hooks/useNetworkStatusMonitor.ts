import { t } from '@lingui/macro';
import { onlineManager } from '@tanstack/react-query';

export const useNetworkStatusMonitor = () => {
  const updateNetworkStatus = () => {
    onlineManager.setOnline(navigator.onLine);
    // onlineManager.setOnline(window.navigator.onLine);
  };

  useEffect(() => {
    updateNetworkStatus();
  }, []);

  useEffect(() => {
    window.addEventListener('offline', updateNetworkStatus);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('load', updateNetworkStatus);

    onlineManager.subscribe((online) => {
      showToast({
        detail: online ? t`Returned back online` : t`You are currently offline`,
        severity: online ? 'success' : 'error',
        summary: online ? 'Online' : 'Offline',
      });
    });

    return () => {
      window.removeEventListener('offline', updateNetworkStatus);

      window.removeEventListener('online', updateNetworkStatus);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.onLine]);

  return true;
};
