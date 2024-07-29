/* eslint-disable @typescript-eslint/no-explicit-any */
import ThemeButton from './ThemeButton';
import moment from 'moment';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import { OverlayPanel } from 'primereact/overlaypanel';

const LeftItems = () => {
  const op = useRef<any>(null);
  const [time, setTime] = useState(moment().format('hh:mm:ss'));
  const items = [
    { name: 'Username : Ali' },
    { name: `Time :${time}` },
    { name: 'Sign Out' },
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
      <div className="card flex justify-content-center">
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
          </div>
        </OverlayPanel>
      </div>
    </>
  );
};

export default LeftItems;
