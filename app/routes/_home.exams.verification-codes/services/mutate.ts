import { generateRandomCode } from '../utils/functions';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

type TPayload = {
  courseId: string;
  studentId: string;
};
export const useGenerateNewVerificationCode = () => {
  return useMutation({
    mutationFn: async ({ courseId, studentId }: TPayload) => {
      const verificationCode = generateRandomCode();
      const studentRef = doc(
        FirebaseDatabase,
        `courses/${courseId}/enrolledcourse/${studentId}`
      );

      // Update the document with the new verificationCode
      await updateDoc(studentRef, { verificationCode });

      return verificationCode; // Optionally return the new code
    },
    onMutate: async () => {
      showToast({
        detail: t`Checking verification code...`,
        severity: 'info',
        summary: t`Processing`,
      });
    },
  });
};

export const useRegenerateVerificationCodesForCourse = () => {
  return useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) => {
      // Reference to the students collection in the course
      const studentsRef = collection(
        FirebaseDatabase,
        `courses/${courseId}/enrolledcourse`
      );
      const studentsSnapshot = await getDocs(studentsRef);

      const batch = writeBatch(FirebaseDatabase);

      for (const document of studentsSnapshot.docs) {
        const verificationCode = generateRandomCode();

        // Update each student's verification code
        const studentRef = document.ref;
        batch.update(studentRef, { verificationCode });
      }

      // Commit the batch update
      await batch.commit();

      return { success: true }; // Optionally return a success object or any relevant data
    },
    onError: () => {
      showToast({
        detail: t`Failed to generate new verification codes.`,
        severity: 'error',
        summary: t`Error`,
      });
    },
    onMutate: async () => {
      showToast({
        detail: t`Generating new verification codes for all students...`,
        severity: 'info',
        summary: t`Processing`,
      });
    },
    onSuccess: () => {
      showToast({
        detail: t`New verification codes generated successfully!`,
        severity: 'success',
        summary: t`Completed`,
      });
    },
  });
};
