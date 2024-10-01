/* eslint-disable @typescript-eslint/no-explicit-any */
import PopUpMenu from './RightItems.PopUpMenu';
import ThemeButton from './ThemeButton';
import { useUserInfo } from '@/services/userQueries';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';

const RightItems = () => {
  const { isLoading } = useUserInfo();
  const op = useRef<any>(null);

  return (
    <>
      <div className="flex items-center">
        <ThemeButton />
        <Button
          icon="pi pi-user"
          loading={isLoading}
          onClick={(event) => op.current.toggle(event)}
          rounded
        />
      </div>
      <OverlayPanel
        pt={{
          content: {
            className: 'p-0',
          },
        }}
        ref={op}
      >
        <PopUpMenu />
      </OverlayPanel>
    </>
  );
};

export default RightItems;
