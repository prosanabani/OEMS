import { UsersListComponent } from './components/UsersListComponent';
import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <div className="">
      <UsersListComponent />
      <Outlet />
    </div>
  );
}
