import PageSlider from './components/PageSlider';
import ThemeButton from './components/ThemeButton';
import { Toolbar } from 'primereact/toolbar';

export function Component() {
  return (
    <>
      <div className="flex ">
        <Toolbar
          end={<ThemeButton />}
          pt={{
            root: {
              className: 'w-full bg-red',
            },
          }}
          start={<PageSlider />}
        />
      </div>
      <Outlet />
    </>
  );
}
