import { collection, getDocs, query, where } from 'firebase/firestore';

// Function to retrieve email based on role and userId
export const getEmailByUserId = async (
  userId: string,
  UserRole: 'admin' | 'teacher' | 'student'
): Promise<string | null> => {
  // Query for a user where userId matches the given userId (userId is a field in the document)

  const usersCollection = collection(FirebaseDatabase, 'users');

  const FieldToSearchInUsers = UserRole === 'student' ? 'userId' : 'fullName';
  const userQuery = query(
    usersCollection,
    where(FieldToSearchInUsers, '==', userId)
  );
  const userQuerySnapshot = await getDocs(userQuery);

  if (userQuerySnapshot.empty) {
    throw new Error('User not found');
  }

  const userDocument = userQuerySnapshot.docs[0]; // Assuming there's only one user with this userId
  const userData = userDocument.data();
  const { role, email } = userData;

  if (role === 'admin' || role === 'teacher') {
    // If the role is admin or teacher, search by fullName
    const nameQuery = query(usersCollection, where('fullName', '==', userId));
    const nameQuerySnapshot = await getDocs(nameQuery);

    if (nameQuerySnapshot.empty) {
      throw new Error('No user found with the matching fullName');
    } else {
      const matchingUserDocument = nameQuerySnapshot.docs[0]; // Assuming the first match is correct
      const matchingUserData = matchingUserDocument.data();
      return matchingUserData.email;
    }
  } else {
    // For non-admin/teacher roles, return the email associated with the userId
    return email;
  }
};
