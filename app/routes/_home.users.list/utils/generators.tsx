import DeleteUserButton from '../components/DeleteUserButton';
import EditUserButton from '../components/EditUserButton';
import { setSearchInput, useUserListStore } from '../store';
import { type TUser } from '@/routes/_home.users.list.new-user/services/types';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export const ActionBodyTemplate = (rowData: TUser) => {
  return (
    <>
      <EditUserButton userData={rowData} />
      <DeleteUserButton id={rowData.id || ''} />
    </>
  );
};

export const SearchBodyTemplate = () => {
  const navigate = useNavigate();

  const SearchInput = useUserListStore((state) => state.SearchInput);
  return (
    <div className="flex justify-between ">
      {/* <IconField iconPosition="left"> */}
      {/* <InputIcon className="pi pi-search" /> */}
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />

        <InputText
          id="Search"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Keyword Search`}
          value={SearchInput}
        />
      </IconField>
      <Button
        label={t`Add user`}
        onClick={() => navigate('/users/list/new-user')}
      />
      {/* </IconField> */}
    </div>
  );
};
