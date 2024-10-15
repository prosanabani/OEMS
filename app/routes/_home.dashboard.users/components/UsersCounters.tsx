import { useUserRoleCounts } from '../services/query'; // Assuming query.ts is in the same directory
import { Card } from 'primereact/card';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

export default function UsersCounters() {
  const { data: roleCounts } = useUserRoleCounts();

  return (
    <div className="card p-5">
      <div className="flex flex-row justify-content-center gap-10">
        <Card className="mr-3 rounded-2xl w-30vw" title="Admins">
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon
              className="i-wpf:administrator w-25px h-20px"
              // style={{ color: '#80ffff' }}
            />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-x-2">
              {roleCounts?.adminCount}
            </span>
            <small> Persons </small>
          </p>
        </Card>

        <Card className="mr-3 rounded-2xl w-30vw" title="Teachers">
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon className="i-hugeicons:teacher w-25px h-25px" />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-between">
              {roleCounts?.teacherCount}
            </span>
            <small> Teachers </small>
          </p>
        </Card>

        <Card className="rounded-2xl w-30vw" title="Students">
          <IconField
            className="flex justify-items-center bottom-3"
            iconPosition="right"
          >
            <InputIcon className="i-mdi:account-student w-25px h-25px" />
          </IconField>
          <p className="m-0">
            <span className="text-2xl text-blue-7 space-between">
              {roleCounts?.studentCount}
            </span>
            <small> Students </small>
          </p>
        </Card>
      </div>
    </div>
  );
}
