// import GlobalBreadCrumb from '@/components/GlobalBreadCrumb';
import { t } from '@lingui/macro';
import { type MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

export function Component() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const TapMenuItems: MenuItem[] = [
    {
      command: () => navigate('/dashboard/general'),
      icon: 'i-jam:world',
      id: 'general',
      label: t`General`,
    },
    {
      command: () => navigate('/dashboard/users'),
      icon: 'i-mdi:person-group',
      id: 'users',
      label: t`Users`,
    },
    {
      command: () => navigate('/dashboard/exams'),
      icon: 'i-healthicons:i-exam-multiple-choice-outline',
      id: 'exams',
      label: t`Exams`,
    },
  ];

  const location = useLocation().pathname.split('/')[2];

  useEffect(() => {
    if (location)
      setActiveIndex(TapMenuItems.findIndex((index) => index.id === location));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabMenu
        activeIndex={activeIndex}
        model={TapMenuItems}
        onTabChange={(event) => setActiveIndex(event.index)}
        pt={{
          icon: {
            className: 'text-xl',
          },
        }}
      />
      <Outlet />
    </>
  );
}
