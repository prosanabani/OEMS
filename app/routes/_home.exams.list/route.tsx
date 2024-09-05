import { t } from '@lingui/macro';
import { Button } from 'primereact/button';

export function Component() {
  const navigate = useNavigate();
  return (
    <div className="">
      exams list
      <Button label={t`Create new Exam`} onClick={() => navigate('new-exam')} />
      <Outlet />
    </div>
  );
}
