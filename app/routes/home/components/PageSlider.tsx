import { Button } from 'primereact/button';
import { type MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { Sidebar } from 'primereact/sidebar';

const PageSlider = () => {
  // const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(true);

  const listIcon = 'pi pi-list';
  const plusIcon = 'pi pi-plus';

  const items: MenuItem[] = [
    {
      icon: 'pi pi-qrcode',
      label: 'Dashboard',
    },
    {
      icon: 'i-ic:outline-class w-18px h-18px mr-[3px] ',
      items: [
        {
          icon: listIcon,
          label: 'Course list',
        },
        {
          icon: plusIcon,
          label: 'Add New course ',
        },
        {
          icon: 'pi pi-eye',
          label: 'View enrolled courses',
        },
      ],
      label: 'Courses',
    },

    {
      icon: 'pi pi-user',
      items: [
        { icon: 'pi pi-users', label: 'User List' },
        { icon: plusIcon, label: 'Add new User' },
      ],
      label: 'Users',
    },
    {
      icon: 'pi pi-book',
      items: [
        { icon: listIcon, label: 'Exams list' },
        { icon: plusIcon, label: 'Add New exam' },
      ],
      label: 'Exams',
    },
    {
      icon: 'i-quill:paper w-18px h-18px',
      items: [
        { icon: plusIcon, label: 'Add New Question' },
        { icon: listIcon, label: 'Question list' },
        { icon: 'pi pi-question', label: 'AI Generated questions' },
      ],
      label: 'Questions',
    },
    {
      icon: 'pi pi-chart-line',
      label: 'Reports & Analytics',
    },
  ];

  return (
    <div className="card flex justify-center">
      <Sidebar
        appendTo="self"
        closeIcon={<Button icon="pi pi-times" />}
        onHide={() => setVisible(false)}
        visible={visible}
      >
        <PanelMenu
          model={items}
          pt={{
            headerLabel: {
              className: 'text-18px ',
            },
            root: {
              className: 'text-18px',
            },
          }}
        />
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
    </div>
  );
};

export default PageSlider;
