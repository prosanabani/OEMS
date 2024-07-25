import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import SidebarHeader from './SidebarHeader';

function SideBar() {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        header={<SidebarHeader />}
        onHide={() => setVisible(false)}
        pt={{
          root: {
            className: 'bg-red',
          },
        }}
        visible={visible}
      />
      <Button label="click" onClick={() => setVisible(true)} />
    </div>
  );
}

export default SideBar;
