import Content from './components/Content';
import { useQuestionsByCourseId } from './services/query';
import { t } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';

export function Component() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data } = useQuestionsByCourseId(state.courseId);

  // console.log(data);

  // before making the exam make a filter to get the questions that are not already in the exam by a
  // drop down menu and to specify the exam structure
  return (
    <Dialog
      dismissableMask
      draggable={false}
      header={t`Add Questions to Exam`}
      maximized
      onHide={() => navigate('..')}
      pt={{
        root: {
          className: 'h-90vh',
        },
      }}
      visible
    >
      <Content />
    </Dialog>
  );
}
