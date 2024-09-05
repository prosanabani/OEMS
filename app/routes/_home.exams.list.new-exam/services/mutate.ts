import { type TAddExamForm } from '../types/examType';
import { useMutation } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';

export const useAddExamToFireBase = () => {
  return useMutation({
    mutationFn: async (examData: TAddExamForm) => {
      // Add the exam to the `exams` collection
      return await addDoc(collection(FirebaseDatabase, 'exams'), examData);
    },
  });
};
