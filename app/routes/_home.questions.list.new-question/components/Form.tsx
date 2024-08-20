import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

export type TFormQuestions = {
  answers: string | null | undefined;
  correctAnswer: string;
  question: string;
  questionType: string;
};

const Form = ({ children }: TProps) => {
  const values = {
    answers: null,
    correctAnswer: '',
    question: '',
    questionType: '',
  };
  const methods = useForm<TFormQuestions>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
