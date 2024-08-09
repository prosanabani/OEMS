import useAppStore, { showToast } from '@/stores/AppStore';
import { Toast } from 'primereact/toast';

const OEMSToast = () => {
  const toastRef = useRef<Toast>(null);
  const { toast } = useAppStore();

  useEffect(() => {
    if (toast) {
      toastRef.current?.show(toast);
      // Clear the toast after showing it
      showToast(null);
    }
  }, [toast]);

  return <Toast position="top-center" ref={toastRef} />;
};

export default OEMSToast;
