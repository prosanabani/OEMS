import { type TUser } from '../utils/types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

type TProps = {
  readonly UserData: TUser;
};
const EditUserDialog = ({ UserData }: TProps) => {
  const [Visible, setVisible] = useState(false);
  return (
    <>
      <Button
        className="mr-2"
        icon="pi pi-pencil"
        onClick={() => setVisible(true)}
        outlined
        rounded
      />

      <Dialog onHide={() => setVisible(false)} visible={Visible}>
        <div>{UserData.name}</div>
      </Dialog>
    </>
  );
};

export default EditUserDialog;
