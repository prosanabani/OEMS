import { type TExamAnswersFormType } from '../types/ExamAnswersFormType';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

const Form = ({ children }: TProps) => {
  const values: TExamAnswersFormType = {
    multipleChoice: [],
    theoretical: [],
    trueOrFalse: [],
  };
  const methods = useForm<TExamAnswersFormType>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
