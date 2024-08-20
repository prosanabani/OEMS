import Form from './components/Form';
import GenerateAiQuestionContent from './components/GenerateAiQuestionContent';
import GenerateNormalQuestionContent from './components/GenerateNormalQuestionContent';
import { t, Trans } from '@lingui/macro';
import { Dialog } from 'primereact/dialog';
import {
  ToggleButton,
  type ToggleButtonChangeEvent,
} from 'primereact/togglebutton';

export function Component() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Form>
      <Dialog
        dismissableMask
        draggable={false}
        header={
          <div className="flex justify-between px-5">
            <div className="">
              <Trans>Add new question</Trans>
            </div>
            <ToggleButton
              checked={checked}
              offIcon="i-quill:paper w-18px h-18x"
              offLabel={t`Normal Question`}
              onChange={(event: ToggleButtonChangeEvent) =>
                setChecked(event.value)
              }
              onIcon="i-hugeicons:artificial-intelligence-02"
              onLabel={t`Ai Question`}
            />
          </div>
        }
        onHide={() => navigate('/questions/list')}
        pt={{
          closeButtonIcon: {
            className: 'w-20 h-20',
          },
          root: {
            className: 'w-80vw h-90vh ',
          },
        }}
        visible
      >
        {checked ? (
          <GenerateAiQuestionContent />
        ) : (
          <GenerateNormalQuestionContent />
        )}
      </Dialog>
    </Form>
  );
}
