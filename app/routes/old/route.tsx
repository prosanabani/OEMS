import { Button } from 'primereact/button';

export function Component() {
  const [mode, setMode] = useState('dark');
  const changeTheme = (newTheme: string) => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/themes/lara-${newTheme}-blue/theme.css`;
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };

  return (
    <>
      <Outlet />
      <div>
        <Button
          icon={`pi ${mode === 'light' ? 'pi-sun' : 'pi-moon'}`}
          rounded
          pt={{
            root: {
              className: 'm-5',
            },
          }}
          onClick={() => changeTheme(mode)}
        />
      </div>
    </>
  );
}
