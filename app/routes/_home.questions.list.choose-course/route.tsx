import { useAllCoursesList } from '../_home.courses.enroll/services/query';
import { t, Trans } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Message } from 'primereact/message';

export function Component() {
  const navigate = useNavigate();
  const { data: AllCourses, isLoading } = useAllCoursesList();
  const [SelectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <Dialog
      dismissableMask
      draggable={false}
      footer={
        <Button
          disabled={!SelectedCourse}
          label={t`Continue`}
          onClick={() =>
            navigate('/questions/list/new-question', { state: SelectedCourse })
          }
        />
      }
      header={t`Choose Course`}
      onHide={() => navigate('..')}
      pt={{
        root: {
          className: 'w-45vw h-60vh',
        },
      }}
      visible
    >
      <Message
        severity="info"
        text={t`Please choose a course you want to make an exam out of`}
      />
      <div className="mt-6">
        <FloatLabel>
          <Dropdown
            autoFocus
            className="w-full"
            inputId="course"
            loading={isLoading}
            onChange={(event: DropdownChangeEvent) =>
              setSelectedCourse(event.value)
            }
            options={AllCourses}
            placeholder={t`Select Course`}
            scrollHeight="200px"
            value={SelectedCourse}
          />
          <label htmlFor="course">
            <Trans>Select Course</Trans>
          </label>
        </FloatLabel>
      </div>
    </Dialog>
  );
}
