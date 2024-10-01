import DialogContent from './RightItems.PopUpMenu.DialogContent';
import { getCourseLevelName } from '@/routes/_home.courses.enrolled-courses/utils/functions';
import { useLogoutMutation } from '@/routes/login/services/mutates';
import { useUserInfo } from '@/services/userQueries';
import { t } from '@lingui/macro';
import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import { Menu } from 'primereact/menu';
import { type MenuItem } from 'primereact/menuitem';

const PopUpMenu = () => {
  const { mutate: Logout } = useLogoutMutation();
  const { data: userInfo } = useUserInfo();
  const [time, setTime] = useState(moment().format('h:mm:ss A'));
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format('h:mm:ss A'));
    }, 1_000);
    // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const items: MenuItem[] = [
    {
      items: [
        {
          icon: 'pi pi-user',
          label: t`Username :  ${userInfo?.fullName}`,
        },
        { icon: 'pi pi-envelope', label: t`Email : ${userInfo?.email}` },
        { icon: 'pi pi-id-card', label: t`Role : ${userInfo?.role}` },
        {
          icon: 'pi pi-id-card',
          label: `Level : ${getCourseLevelName(userInfo?.level || '')}`,
          visible: userInfo?.role === 'student',
        },
        {
          icon: 'pi pi-calendar',
          label: t`Date : ${moment().format('MMMM Do YYYY')}`,
        },
        { icon: 'pi pi-clock', label: t`Time : ${time}` },
      ],
      label: t`Profile`,
    },
    {
      command: () => setVisible(true),
      icon: 'i-tabler:lock w-5 h-5',
      label: t`Change password`,
    },
    {
      command: () => {
        Logout();
      },
      icon: 'i-tabler:logout w-5 h-5 ml-0.4',
      label: t`Log Out`,
    },
  ];
  return (
    <>
      <Menu className="w-20vw" model={items} />
      <Dialog
        dismissableMask
        draggable={false}
        header={t`Change Password`}
        onHide={() => setVisible(false)}
        pt={{
          content: {
            className: 'pt-5',
          },
          root: {
            className: 'w-30vw h-55vh',
          },
        }}
        visible={visible}
      >
        <DialogContent />
      </Dialog>
    </>
  );
};

export default PopUpMenu;
