import { useAddExamToFireBase } from '../services/mutate';
import { type TAddExamForm } from '../types/examType';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { useFormContext } from 'react-hook-form';

const Footer = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useFormContext<TAddExamForm>();

  const { isPending, mutate } = useAddExamToFireBase();

  const addExam = (data: TAddExamForm) => {
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
        navigate('/exams/list/add-questions', { state: data });
      },
    });
  };

  return (
    <Button
      disabled={isPending}
      label={t`Create Exam`}
      loading={isPending}
      onClick={handleSubmit(addExam)}
    />
  );
};

export default Footer;
