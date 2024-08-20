import ConfirmPopUP from '../components/confirmpopu';
import EditUserDialog from '../components/EditUserDialog';
import { setSearchInput, useUserListStore } from '../store';
import { type TUser } from './types';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export const actionBodyTemplate = (rowData: TUser) => {
  return (
    <>
      <EditUserDialog UserData={rowData} />
      <ConfirmPopUP key={rowData.id} />
    </>
  );
};

export const SearchBodyTemplate = () => {
  const SearchInput = useUserListStore((state) => state.SearchInput);
  return (
    <div className="flex justify-content-end">
      {/* <IconField iconPosition="left"> */}
      {/* <InputIcon className="pi pi-search" /> */}
      <FloatLabel>
        <InputText
          id="Search"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Keyword Search`}
          value={SearchInput}
        />
        <label htmlFor="Search">Search</label>
        <Button className="i-material-symbols:search w-1em h-1em" />
      </FloatLabel>
      {/* </IconField> */}
    </div>
  );
};
