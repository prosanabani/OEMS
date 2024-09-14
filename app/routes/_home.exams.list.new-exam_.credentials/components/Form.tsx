import { type TExamCredentials } from '../type';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type TProps = {
  readonly children: React.ReactNode;
};

const Form = ({ children }: TProps) => {
  const { state } = useLocation();
  const values: TExamCredentials = {
    ...state,
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
  };
  const methods = useForm<TExamCredentials>({
    defaultValues: values,
    mode: 'all',
    values,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
