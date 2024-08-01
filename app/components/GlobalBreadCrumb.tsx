import { BreadCrumb } from 'primereact/breadcrumb';

type TProps = {
  readonly items: Array<{
    label: string;
    path: string;
  }>;
};
const GlobalBreadCrumb = ({ items }: TProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumb items based on current location

  const breadcrumbItems = items.map((item) => {
    const isActive = item.path === location.pathname;

    return {
      ...item,
      template: (
        <p
          className={`cursor-pointer ${isActive ? 'text-blue' : 'text-inherit'}`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </p>
      ),
    };
  });

  // Add home breadcrumb
  const home = { command: () => navigate('/dashboard'), icon: 'pi pi-home' };

  return (
    <BreadCrumb
      home={home}
      model={breadcrumbItems}
      pt={{
        icon: {
          className: 'text-xl',
        },
        label: {
          className: 'text-xl font-semibold',
        },
      }}
    />
  );
};

export default GlobalBreadCrumb;
