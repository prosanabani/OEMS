import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

export const useVerificationCode = (courseId: string, studentId: string) => {
  return useQuery({
    queryFn: async () => {
      // Reference to the specific course document
      const enrolledCourseDocumentRef = doc(
        FirebaseDatabase,
        `courses/${courseId}/enrolledcourse/${studentId}`
      );

      // Fetch the document from Firestore
      const enrolledCourseDocument = await getDoc(enrolledCourseDocumentRef);

      if (enrolledCourseDocument.exists()) {
        // Return the verification code if it exists
        const data = enrolledCourseDocument.data();
        return data.verificationCode;
      } else {
        showToast({
          detail: t`Verification code not found`,
          severity: 'error',
          summary: t`Error`,
        });
      }

      return null;
    },
    queryKey: [QueryKeys.VERIFICATION_CODE, courseId, studentId],
  });
};
