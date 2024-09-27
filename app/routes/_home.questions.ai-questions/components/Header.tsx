import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Header = () => {
  return (
    <div className="flex justify-between">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        {/* <InputText
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Search for exam`}
          value={SearchInput}
        /> */}
      </IconField>
      {/* <Button label={t`Add question`} onClick={() => navigate('add')} /> */}
    </div>
  );
};

export default Header;
