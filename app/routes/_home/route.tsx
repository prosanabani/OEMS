import PageSlider from './components/PageSlider';
import RightItems from './components/RightItems';
import { Toolbar } from 'primereact/toolbar';

export function Component() {
  return (
    <>
      <Toolbar
        end={<RightItems />}
        pt={{
          root: {
            className: 'p-0 px-5',
          },
        }}
        start={<PageSlider />}
      />
      <Outlet />
    </>
  );
}
