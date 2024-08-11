import EditUserDialog from '../components/EditUserDialog';
import { Button } from 'primereact/button';
import { TUser } from './types';
import { InputText } from 'primereact/inputtext';
import { setSearchInput, useUserListStore } from '../store';
import { t } from '@lingui/macro';
import Confirmpopu from '../components/confirmpopu';

export const actionBodyTemplate = (rowData: TUser) => {
  return (
    <>
      <EditUserDialog UserData={rowData} />
      <Confirmpopu />
    </>
  );
};

export const SearchBodyTemplate = () => {
  const SearchInput = useUserListStore((state) => state.SearchInput);
  return (
    <div className="flex justify-content-end">
      {/* <IconField iconPosition="left"> */}
      {/* <InputIcon className="pi pi-search" /> */}
      <InputText
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder={t`Keyword Search`}
        value={SearchInput}
      />
      {/* </IconField> */}
    </div>
  );
};
