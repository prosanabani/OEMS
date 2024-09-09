import { Button } from 'primereact/button';
import { type MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { Sidebar } from 'primereact/sidebar';

const PageSlider = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  const listIcon = 'pi pi-list';
  const plusIcon = 'pi pi-plus';

  const items: MenuItem[] = [
    {
      command: () => {
        setVisible(false);
        navigate('/dashboard');
      },
      icon: 'pi pi-qrcode',
      label: 'Dashboard',
    },
    {
      icon: 'i-ic:outline-class w-18px h-18px mr-[3px] ',
      items: [
        {
          command: () => {
            setVisible(false);
            navigate('/courses/course-list');
          },
          icon: listIcon,
          label: 'Course list',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/courses/new-course');
          },
          icon: plusIcon,
          label: 'Add New course ',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/courses/enrolled');
          },
          icon: 'pi pi-eye',
          label: 'View enrolled courses',
        },
      ],
      label: 'Courses',
    },

    {
      icon: 'pi pi-user',
      items: [
        {
          command: () => {
            setVisible(false);
            navigate('/users/list');
          },
          icon: 'pi pi-users',
          label: 'User List',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/users/list/new-user');
          },
          icon: plusIcon,
          label: 'Add new User',
        },
      ],
      label: 'Users',
    },
    {
      icon: 'pi pi-book',
      items: [
        {
          command: () => {
            setVisible(false);
            navigate('/exams/list');
          },

          icon: listIcon,
          label: 'Exams list',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/exams/list/new-exam');
          },
          icon: plusIcon,
          label: 'Add New exam',
        },
      ],
      label: 'Exams',
    },
    {
      icon: 'i-quill:paper w-18px h-18px',
      items: [
        {
          command: () => {
            setVisible(false);
            navigate('/questions/list/new-question');
          },
          icon: plusIcon,
          label: 'Add New Question',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/questions/list');
          },
          icon: listIcon,
          label: 'Question list',
        },
        {
          command: () => {
            setVisible(false);
            navigate('/questions/ai-questions');
          },
          icon: 'i-hugeicons:artificial-intelligence-02 ',
          label: 'AI Generated questions',
        },
      ],
      label: 'Questions',
    },
    {
      command: () => {
        setVisible(false);
        navigate('/reports');
      },
      icon: 'pi pi-chart-line',
      label: 'Reports & Analytics',
    },
  ];

  return (
    <div className="card flex justify-center">
      <Sidebar
        appendTo="self"
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
