import { t } from '@lingui/macro';
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
      label: t`Dashboard`,
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
          label: t`Course list`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/courses/new-course');
          },
          icon: plusIcon,
          label: t`Add New course`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/courses/enrolled');
          },
          icon: 'pi pi-eye',
          label: t`View enrolled courses`,
        },
      ],
      label: t`Courses`,
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
          label: t`User List`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/users/list/new-user');
          },
          icon: plusIcon,
          label: t`Add new User`,
        },
      ],
      label: t`Users`,
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
          label: t`Exams list`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/exams/list/add');
          },
          icon: plusIcon,
          label: t`Add New exam`,
        },
      ],
      label: t`Exams`,
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
          label: t`Add New Question`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/questions/list');
          },
          icon: listIcon,
          label: t`Question list`,
        },
        {
          command: () => {
            setVisible(false);
            navigate('/questions/ai-questions');
          },
          icon: 'i-hugeicons:artificial-intelligence-02 ',
          label: t`AI Generated questions`,
        },
      ],
      label: t`Questions`,
    },
    {
      command: () => {
        setVisible(false);
        navigate('/reports');
      },
      icon: 'pi pi-chart-line',
      label: t`Reports & Analytics`,
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
