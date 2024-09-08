import { type CourseFormValues } from './types';
import { FirebaseDatabase } from '@/config/firebase';
import { showToast } from '@/stores/AppStore';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export const useDeleteCourseFromFirebase = () => {
  return useMutation({
    mutationFn: async (courseID: string) => {
      // Reference to the document in the main collection
      const userDocumentRef = doc(FirebaseDatabase, 'courses', courseID);

      // Check if the document exists in the main collection
      const questionDocument = await getDoc(userDocumentRef);
      if (questionDocument.exists()) {
        // If the document exists, delete it
        await deleteDoc(userDocumentRef);
      } else {
        showToast({
          detail: t`Failed to delete the user`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};

export const useEditCourseFromFirebase = () => {
  return useMutation({
    mutationFn: async (payload: CourseFormValues) => {
      // Reference to the document in the main collection
      const userDocumentRef = doc(
        FirebaseDatabase,
        'courses',
        payload.id || ''
      );

      // Check if the document exists in the main collection
      const userDocument = await getDoc(userDocumentRef);
      if (userDocument.exists()) {
        // If the document exists, update it
        await updateDoc(userDocumentRef, {
          courseLevel: payload.courseLevel,

          courseName: payload.courseName,
          courseTeacher: payload.courseTeacher,
        });
      } else {
        showToast({
          detail: t`Failed to update the user`,
          severity: 'error',
          summary: t`Error`,
        });
      }
    },
  });
};
