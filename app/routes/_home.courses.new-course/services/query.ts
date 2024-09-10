import { type CourseFormValues } from '@/routes/_home.courses.course-list/services/types';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';

const useAddUser = () => {
  return useMutation({
    mutationFn: async (data: CourseFormValues) => {
      await addDoc(collection(FirebaseDatabase, 'courses'), {
        courseLevel: data.courseLevel,
        courseName: data.courseName,
        courseTeacher: data.courseTeacher,
      });
    },
  });
};

export default useAddUser;
