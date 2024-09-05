import { type TAddExamForm } from '../types/examType';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

const Form = ({ children }: TProps) => {
  const values = {
    examDescription: '',
    examMark: 50,
    examName: '',
    examPassMark: 0,
    examTitle: '',
  };
  const methods = useForm<TAddExamForm>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
