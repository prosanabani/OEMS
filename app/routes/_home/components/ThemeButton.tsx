/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@lingui/macro';
import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { type MenuItem } from 'primereact/menuitem';
import { useContext, useEffect, useRef, useState } from 'react';

const ThemeButton = () => {
  const darkTheme = 'lara-dark-blue';
  const lightTheme = 'lara-light-blue';
  const themeLink = 'theme-link';
  const changeTheme = useContext(PrimeReactContext)?.changeTheme;
  const menuLeft = useRef(null);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Initial check
    handleChange();

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const themes: MenuItem[] = [
    {
      items: [
        {
          command: () => {
            // @ts-expect-error fix later
            changeTheme(darkTheme, lightTheme, themeLink, () =>
              showToast({
                detail: t`Light theme changed successfully`,
                severity: 'success',
                summary: t`Success`,
              })
            );
          },
          icon: 'pi pi-sun',
          label: t`Light`,
        },
        {
          command: () => {
            // @ts-expect-error fix later
            changeTheme(lightTheme, darkTheme, themeLink, () =>
              showToast({
                detail: t`Dark theme changed successfully`,
                severity: 'success',
                summary: t`Success`,
              })
            );
          },
          icon: 'pi pi-moon',
          label: t`Dark`,
        },
        {
          command: () => {
            // Apply the system theme
            if (systemTheme === 'dark') {
              // @ts-expect-error fix later
              changeTheme(lightTheme, darkTheme, themeLink, () =>
                showToast({
                  detail: t`System theme changed to Dark mode`,
                  severity: 'success',
                  summary: t`Success`,
                })
              );
            } else {
              // @ts-expect-error fix later
              changeTheme(darkTheme, lightTheme, themeLink, () =>
                showToast({
                  detail: t`System theme changed to Light mode`,
                  severity: 'success',
                  summary: t`Success`,
                })
              );
            }
          },
          icon: 'pi pi-cog',
          label: t`System`,
        },
      ],
      label: t`Theme`,
    },
  ];

  return (
    <div>
      <Button
        aria-controls="popup_menu_left"
        aria-haspopup
        className="mr-2"
        icon="pi pi-palette"
        onClick={
          // @ts-expect-error FIX
          (event) => menuLeft.current.toggle(event)
        }
        rounded
      />

      <Menu id="popup_menu_left" model={themes} popup ref={menuLeft} />
    </div>
  );
};

export default ThemeButton;
