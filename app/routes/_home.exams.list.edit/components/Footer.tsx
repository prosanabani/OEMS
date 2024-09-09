import { useEditExam } from '../services/mutates';
import { type TExamList } from '@/routes/_home.exams.list/types/examListType';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { useFormContext } from 'react-hook-form';

const Footer = () => {
  const navigate = useNavigate();
  const {
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<TExamList>();

  const { isPending, mutate } = useEditExam();

  const addExam = (data: TExamList) => {
    mutate(data, {
      onError: () => {
        showToast({
          detail: t`Failed to add the exam`,
          severity: 'error',
          summary: t`Error`,
        });
      },

      onSuccess: () => {
        showToast({
          detail: t`Exam has been added successfully`,
          severity: 'success',
          summary: t`Success`,
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.EXAMS_TABLE],
        });
        navigate('..');
      },
    });
  };

  return (
    <Button
      disabled={isPending || !isDirty}
      label={t`Update Exam`}
      loading={isPending}
      onClick={handleSubmit(addExam)}
    />
  );
};

export default Footer;
