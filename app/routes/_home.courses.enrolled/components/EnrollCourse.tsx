import { useCoursesList } from '../services/query';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EnrolledCourseFormValues } from '../types/typs';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
import { t } from '@lingui/macro';
import { QueryKeys } from '@/utils/constants/QueryEnums';

export default function EnrollCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { data } = useCoursesList('2'); // userLevel
  const toast = useRef<Toast>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EnrolledCourseFormValues>({
    defaultValues: {
      selectedCourse: '',
      studentId: 'JRMYA3iNy2Ujw61xkHcAd5oi5472',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: EnrolledCourseFormValues) => {
      const courseDocumentRef = doc(
        FirebaseDatabase,
        'courses',
        data.selectedCourse
      );
      const enrolledCourseRef = collection(courseDocumentRef, 'enrolledcourse');

      // Fetch all documents in the 'enrolledcourse' collection
      const querySnapshot = await getDocs(enrolledCourseRef);

      // Check if any document has the same studentId or matches the document ID
      let isAlreadyEnrolled = false;

      querySnapshot.forEach((doc) => {
        if (doc.id === data.studentId) {
          isAlreadyEnrolled = true;
        }
      });

      if (isAlreadyEnrolled) {
        throw new Error('Student is already enrolled in this course.');
      }

      // Proceed with enrollment using studentId as the document ID
      const studentDocRef = doc(enrolledCourseRef, data.studentId);
      await setDoc(studentDocRef, {
        verificationCode: '654649789',
      });
    },
    onSuccess: () => {
      showToast({
        detail: t`Course enrolled successfully`,
        severity: 'success',
        summary: t`Success`,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.STUDENT_COURSES],
      });
    },
    onError: (error) => {
      let errorMessage = t`Course enrollment failed`;
      if (error.message === 'Student is already enrolled in this course.') {
        errorMessage = t`Student is already enrolled in this course`;
      }
      showToast({
        detail: errorMessage,
        severity: 'error',
        summary: t`Error`,
      });
    },
  });

  const onSubmit = (data: EnrolledCourseFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="selectedCourse">Select a Course</label>
          <Controller
            control={control}
            name="selectedCourse"
            render={({ field }) => (
              <Dropdown
                id="selectedCourse"
                {...field}
                className={errors.selectedCourse && 'p-invalid'}
                onChange={(event: DropdownChangeEvent) => {
                  setSelectedCourse(event.value);
                  field.onChange(event.value);
                }}
                optionLabel="label"
                options={data}
                placeholder="Select a Course"
                value={selectedCourse}
              />
            )}
            rules={{ required: 'Please select a course.' }}
          />
          {errors.selectedCourse && (
            <small className="p-error">{errors.selectedCourse.message}</small>
          )}
        </div>

        <Button label="Enroll" type="submit" className="mt-2" />
      </form>
    </div>
  );
}
