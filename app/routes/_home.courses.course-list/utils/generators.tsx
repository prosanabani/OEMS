import DeleteCourseButton from '../components/DeleteCourseButton';
import EditCourseButton from '../components/EditCourseButton';
import { type CourseFormValues } from '../services/types';
import { setSearchInput, useCourseListStore } from '../store';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export const ActionBodyTemplate = (rowData: CourseFormValues) => {
  return (
    <>
      <EditCourseButton userData={rowData} />
      <DeleteCourseButton id={rowData.id || ''} />
    </>
  );
};

export const SearchBodyTemplate = () => {
  const navigate = useNavigate();

  const SearchInput = useCourseListStore((state) => state.SearchInput);
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
        label={t`Add Course`}
        onClick={() => navigate('/courses/new-course')}
      />
      {/* </IconField> */}
    </div>
  );
};
