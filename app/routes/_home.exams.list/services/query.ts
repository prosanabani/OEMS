import { type TExamList } from '../types/examListType';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const useExamsData = () => {
  return useQuery({
    queryFn: async (): Promise<TExamList[]> => {
      const examCollectionRef = collection(FirebaseDatabase, 'exams');
      const snapshot = await getDocs(examCollectionRef);
      return snapshot.docs.map((document_) => ({
        id: document_.id,
        ...document_.data(),
      })) as TExamList[];
    },
    queryKey: [QueryKeys.EXAMS_TABLE],
  });
};
