import { type TAddExamForm } from '../types/examType';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

const Form = ({ children }: TProps) => {
  const values: TAddExamForm = {
    courseId: undefined,
    examDescription: '',
    examFormat: {
      currentFormatMarks: 0,
      multipleChoice: {
        count: 0,
        isIncluded: false,
        marksPerQuestion: 0,
      },
      theoretical: {
        count: 0,
        isIncluded: false,
        marksPerQuestion: 0,
      },
      trueOrFalse: {
        count: 0,
        isIncluded: false,
        marksPerQuestion: 0,
      },
    },
    examMark: 50,
    examName: '',
    examPassMark: 25,
    examQuestions: [],
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
