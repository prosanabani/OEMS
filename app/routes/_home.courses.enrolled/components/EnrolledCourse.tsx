import { useCoursesList } from '../services/query';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EnrolledCourseFormValues } from '../types/typs';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
import { t } from '@lingui/macro';
import { QueryKeys } from '@/utils/constants/QueryEnums';

export default function EnrolledCourse() {
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
      studentId: 'kljlkjsdkljfsjoijr454',
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

      await addDoc(enrolledCourseRef, {
        studentId: data.studentId,
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
    onError: () => {
      showToast({
        detail: t`Course enrollment failed`,
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
