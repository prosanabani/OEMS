import { TAddExamForm } from '@/routes/_home.exams.list.add/types/examType';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

export const useExamDetails = (examId: string) => {
  return useQuery({
    queryFn: async () => {
      const examRef = doc(FirebaseDatabase, 'exams', examId);
      const examSnapshot = await getDoc(examRef);

      if (!examSnapshot.exists()) {
        showToast({
          detail: t`Exam wasn't found`,
          severity: 'error',
          summary: t`Failed to get exam`,
        });
      }

      return { id: examSnapshot.id, ...examSnapshot.data() } as TAddExamForm;
    },
    queryKey: [QueryKeys.EXAM_DETAILS, examId],
  });
};
