import { type TAddExamForm } from '@/routes/_home.exams.list.add/types/examType';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useExamsData = (courseId: string) => {
  return useQuery({
    queryFn: async (): Promise<TAddExamForm[]> => {
      const examCollectionRef = collection(FirebaseDatabase, 'exams');
      const snapshot = await getDocs(examCollectionRef);
      return snapshot.docs.map((document_) => ({
        id: document_.id,
        ...document_.data(),
      })) as TAddExamForm[];
    },
    queryKey: [QueryKeys.EXAMS_TABLE],
    select(data) {
      if (courseId === 'all') return data;
      return data.filter((exam) => exam.courseId === courseId);
    },
  });
};
