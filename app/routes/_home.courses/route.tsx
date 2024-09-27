// import GlobalBreadCrumb from '@/components/GlobalBreadCrumb';
import { useUserInfo } from '@/services/userQueries';
import { type MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

export function Component() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: userInfo } = useUserInfo();
  const TapMenuItems: MenuItem[] = [
    {
      command: () => navigate('/courses/course-list'),
      icon: 'i-fluent:list-rtl-20-filled',
      id: 'course-list',
      label: 'Courses',
    },
    {
      command: () => navigate('/courses/enroll'),
      icon: 'i-hugeicons:course',
      id: 'enroll',
      label: 'Enroll Course',
    },
    {
      command: () => navigate('/courses/enrolled-courses'),
      icon: 'i-hugeicons:course',
      id: 'enrolled-courses',
      label: 'users enrolled-courses',
      visible: userInfo?.role === 'student',
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
      {/* <GlobalBreadCrumb
        items={[
          { label: 'Courses', path: '/courses' },
          { label: 'Course List', path: '/courses/course-list' },
        ]}
      /> */}
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
