/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@lingui/macro';
import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { type MenuItem } from 'primereact/menuitem';

const ThemeButton = () => {
  const changeTheme = useContext(PrimeReactContext)?.changeTheme;
  const menuLeft = useRef(null);

  const themes: MenuItem[] = [
    {
      items: [
        {
          command: () => {
            // @ts-expect-error fix later
            changeTheme('lara-dark-blue', 'lara-light-blue', 'theme-link', () =>
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
            changeTheme('lara-light-blue', 'lara-dark-blue', 'theme-link', () =>
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
