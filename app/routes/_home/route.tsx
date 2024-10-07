import PageSlider from './components/PageSlider';
import RightItems from './components/RightItems';
import { Toolbar } from 'primereact/toolbar';

export function Component() {
  return (
    <>
      <Toolbar end={<RightItems />} start={<PageSlider />} />
      <Outlet />
    </>
  );
}
