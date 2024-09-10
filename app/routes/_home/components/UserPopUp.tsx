/* eslint-disable @typescript-eslint/no-explicit-any */
import ThemeButton from './ThemeButton';
import { useLogoutMutation } from '@/routes/login/services/mutates';
import moment from 'moment';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { type SelectItemOptionsType } from 'primereact/selectitem';

const UserPopUp = () => {
  const { mutate: Logout } = useLogoutMutation();
  const op = useRef<any>(null);
  const [time, setTime] = useState(moment().format('hh:mm:ss'));
  const items: SelectItemOptionsType = [
    { name: 'Username : Ali' },
    { name: `Time :${time}` },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format('hh:mm:ss'));
    }, 1_000);
    // Update every second

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <ThemeButton />
      <div className="card flex  justify-center">
        <Button
          icon="pi pi-user"
          onClick={(event) => op.current.toggle(event)}
          rounded
        />
        <OverlayPanel
          pt={{
            content: {
              className: 'p-0',
            },
          }}
          ref={op}
        >
          <div className="p-2">
            <ListBox
              className="w-full md:w-14rem"
              optionLabel="name"
              options={items}
              pt={{
                root: {
                  className: 'border-none',
                },
              }}
            />
            <Button label="Sign Out" onClick={() => Logout()} />
          </div>
        </OverlayPanel>
      </div>
    </>
  );
};

export default UserPopUp;
