import LeftItems from './components/LeftItems';
import PageSlider from './components/PageSlider';
import { Toolbar } from 'primereact/toolbar';

export function Component() {
  return (
    <>
      <div className="flex ">
        <Toolbar
          end={<LeftItems />}
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
