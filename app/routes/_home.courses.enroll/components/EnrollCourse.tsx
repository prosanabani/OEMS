import { useCoursesList } from '../services/query';
import { type EnrolledCourseFormValues } from '../types/typs';
import { getRandomSixNumbers } from '../utils/function';
import { useUserInfo } from '@/services/userQueries';
import { QueryKeys } from '@/utils/constants/QueryEnums';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EnrollCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { data: userInfo } = useUserInfo();
  const { data: coursesList } = useCoursesList(userInfo?.level || ''); // userLevel
  const toast = useRef<Toast>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EnrolledCourseFormValues>({
    defaultValues: {
      selectedCourse: '',
      studentId: userInfo?.id || '',
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

      for (const document of querySnapshot.docs) {
        if (document.id === data.studentId) {
          isAlreadyEnrolled = true;
        }
      }

      if (isAlreadyEnrolled) {
        throw new Error('Student is already enrolled in this course.');
      }

      // Proceed with enrollment using studentId as the document ID
      const studentDocumentRef = doc(enrolledCourseRef, data.studentId);
      await setDoc(studentDocumentRef, {
        verificationCode: getRandomSixNumbers(),
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
                options={coursesList}
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

        <Button className="mt-2" label="Enroll" type="submit" />
      </form>
    </div>
  );
}
