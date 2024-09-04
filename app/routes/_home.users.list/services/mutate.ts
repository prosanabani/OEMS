import { type AddUserFormValues } from '@/routes/_home.users.list.new-user/services/types';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export const useDeleteUserFromFirebase = () => {
  return useMutation({
    mutationFn: async (userID: string) => {
      // Reference to the document in the main collection
      const userDocumentRef = doc(FirebaseDatabase, 'users', userID);

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

export const useEditUserFromFirebase = () => {
  return useMutation({
    mutationFn: async (payload: AddUserFormValues) => {
      // Reference to the document in the main collection
      const userDocumentRef = doc(FirebaseDatabase, 'users', payload.id || '');

      // Check if the document exists in the main collection
      const userDocument = await getDoc(userDocumentRef);
      if (userDocument.exists()) {
        // If the document exists, update it
        await updateDoc(userDocumentRef, {
          fullName: payload.fullName,
          level: payload.level,
          password: payload.password,
          // picture: payload.picture,
          role: payload.role,
          userId: payload.userId,
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
