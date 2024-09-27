import { type TExamList } from '@/routes/_home.exams.list/types/examListType';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

const Form = ({ children }: TProps) => {
  const { state } = useLocation();

  const values: TExamList = {
    courseId: state.courseId,
    examDescription: state.examDescription,
    examFormat: state.examFormat,
    examMark: state.examMark,
    examName: state.examName,
    examPassMark: state.examPassMark,
    examQuestions: state.examQuestions,
    examTitle: state.examTitle,
    id: state.id,
  };
  const methods = useForm<TExamList>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
