import PageSlider from './components/PageSlider';
import UserPopUp from './components/UserPopUp';
import { Toolbar } from 'primereact/toolbar';

export function Component() {
  return (
    <>
      <div className="flex ">
        <Toolbar
          end={<UserPopUp />}
          pt={{
            root: {
              className: 'w-full',
            },
          }}
          start={<PageSlider />}
        />
      </div>
      <Outlet />
    </>
  );
}
