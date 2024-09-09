import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

export type TFormQuestions = {
  question: string;
  questionAnswers: string | null | undefined;
  questionCorrectAnswer: string;
  questionType: 'theoretical' | 'trueOrFalse' | 'multipleChoice' | null;
};

const Form = ({ children }: TProps) => {
  const values = {
    question: '',
    questionAnswers: null,
    questionCorrectAnswer: '',
    questionType: null,
  };
  const methods = useForm<TFormQuestions>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
