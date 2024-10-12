import { type TUser } from '@/routes/_home.users.list.new-user/services/types';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

export const useDeleteUserFromFirebase = () => {
  return useMutation({
    mutationFn: async (userID: string) => {
      // Reference to the user document in the main collection
      const userDocumentRef = doc(FirebaseDatabase, 'users', userID);

      // Check if the user document exists
      const userDocument = await getDoc(userDocumentRef);
      if (!userDocument.exists()) {
        showToast({
          detail: t`Failed to delete the user`,
          severity: 'error',
          summary: t`Error`,
        });
        return;
      }

      // Batch to perform deletions
      const batch = writeBatch(FirebaseDatabase);

      // Reference to the 'courses' collection
      const coursesRef = collection(FirebaseDatabase, 'courses');
      const coursesSnapshot = await getDocs(coursesRef);

      // Loop through each course to check if the user is registered in 'enrolled-students' subcollection
      for (const courseDocument of coursesSnapshot.docs) {
        const enrolledStudentsRef = collection(
          courseDocument.ref,
          'enrolledcourse'
        );
        const studentDocument = doc(enrolledStudentsRef, userID);

        // Check if the student is enrolled in the course
        const studentSnapshot = await getDoc(studentDocument);
        if (studentSnapshot.exists()) {
          // Delete the student document from the enrolled-students subcollection
          batch.delete(studentDocument);
        }
      }

      // Add user deletion to the batch
      batch.delete(userDocumentRef);

      // Commit the batch operation
      await batch.commit();

      const user = FirebaseAuth.currentUser;
      if (user && user.uid === userID) {
        await deleteUser(user);
      }
    },
    onError: () => {
      showToast({
        detail: t`Error deleting user and associated registrations`,
        severity: 'error',
        summary: t`Error`,
      });
    },
  });
};

export const useEditUserFromFirebase = () => {
  return useMutation({
    mutationFn: async (payload: TUser) => {
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
