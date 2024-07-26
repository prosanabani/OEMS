import SidebarHeader from './PageSlider.SidebarHeader';
import { Button } from 'primereact/button';
import { type MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { Sidebar } from 'primereact/sidebar';

const PageSlider = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const items: MenuItem[] = [
    {
      icon: 'pi pi-file',
      items: [
        {
          icon: 'pi pi-file',
          items: [
            {
              icon: 'pi pi-file-pdf',
              items: [
                {
                  icon: 'pi pi-stop',
                  label: 'Pending',
                },
                {
                  icon: 'pi pi-check-circle',
                  label: 'Paid',
                },
              ],
              label: 'Invoices',
            },
            {
              icon: 'pi pi-users',
              label: 'Clients',
            },
          ],
          label: 'Documents',
        },
        {
          icon: 'pi pi-image',
          items: [
            {
              icon: 'pi pi-image',
              label: 'Logos',
            },
          ],
          label: 'Images',
        },
      ],
      label: 'Files',
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        closeIcon={<Button icon="pi pi-times" />}
        header={<SidebarHeader />}
        onHide={() => setVisible(false)}
        visible={visible}
      >
        <PanelMenu model={items} />
      </Sidebar>

      <Button label="click" onClick={() => setVisible(true)} />
    </div>
  );
};

export default PageSlider;
