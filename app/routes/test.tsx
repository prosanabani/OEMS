import { Trans } from '@lingui/macro';

export default function Component() {
  return (
    <main className="px-4 py-10 bg-red text-center text-gray-700 dark:text-gray-200">
      <Outlet />
      <div className="mx-auto mt-5 text-center text-sm opacity-50">
        <Trans>test</Trans>
        <button>dkjcndsk 'kdjc'</button>
      </div>
    </main>
  );
}
