import { Outlet } from 'react-router-dom';
import Block from './components/Block';

export function Component() {
  return (
    <main className="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <Outlet />
      <div className="mx-auto mt-5 text-center text-sm opacity-50">
        kjnkajnksajnk
        <Block />
      </div>
    </main>
  );
}