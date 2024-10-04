import { type TVerificationCodeList } from '../utils/types';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

type TUserList = Array<{
  email: string;
  fullName: string;
  id?: string | undefined;
  level?: string | undefined;
  password: string;
  role: 'admin' | 'student' | 'teacher';
  userId?: string | undefined;
}>;
export const useVerificationCodeList = (
  courseId: string,
  usersList: TUserList
) => {
  return useQuery({
    queryFn: async () => {
      const studentsRef = collection(
        FirebaseDatabase,
        `courses/${courseId}/enrolledcourse`
      );
      const querySnapshot = await getDocs(studentsRef);

      // Map through each document and extract student ID and verification code
      return querySnapshot.docs.map(
        (document_) =>
          ({
            studentId: document_.id, // Student ID is the document ID
            ...document_.data(), // The rest of the document (including verificationCode)
          }) as TVerificationCodeList
      ); // Array of students with their verification codes
    },
    queryKey: [QueryKeys.VERIFICATION_CODE_LIST, courseId],
    refetchInterval: 5_000,
    select(data) {
      return data.map((item) => ({
        ...item,
        fullName:
          usersList?.find((user) => user.id === item.studentId)?.fullName ||
          t`Student not found`,
      }));
    },
  });
};
