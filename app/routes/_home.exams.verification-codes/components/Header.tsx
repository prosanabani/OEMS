import { useRegenerateVerificationCodesForCourse } from '../services/mutate';
import {
  setQueryParameters,
  setSearchInput,
  useVerificationCodeListStore,
} from '../store';
import { useAllCoursesList } from '@/routes/_home.courses.enroll/services/query';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

const Header = () => {
  const { data: AllCourses, isLoading } = useAllCoursesList();
  const { SearchInput, queryParameters } = useVerificationCodeListStore(
    (state) => ({
      queryParameters: state.queryParameters,
      SearchInput: state.SearchInput,
    })
  );

  const { mutate } = useRegenerateVerificationCodesForCourse();

  return (
    <div className="flex px-10 justify-between items-center">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          id="Search"
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t`Search`}
          value={SearchInput}
        />
      </IconField>

      <Button
        label={t`Regenerate Verification Codes`}
        onClick={() =>
          mutate(
            { courseId: queryParameters.courseId || '' },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: [
                    QueryKeys.VERIFICATION_CODE_LIST,
                    queryParameters.courseId,
                  ],
                });
              },
            }
          )
        }
      />

      <Dropdown
        filter
        loading={isLoading}
        onChange={(event) =>
          setQueryParameters({
            courseId: event.value,
          })
        }
        optionLabel="courseName"
        optionValue="id"
        options={AllCourses}
        placeholder={t`Select Course`}
        value={queryParameters.courseId}
      />
    </div>
  );
};

export default Header;
