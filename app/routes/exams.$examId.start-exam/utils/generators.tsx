export const nothing = () => {
  return 'nothing';
};

// export const GenerateStepperPanelHeader = (question: TQuestion | null) => {
//   const {
//     formState: { errors },
//   } = useFormContext<TExamAnswersFormType>();

//   const errorCountInQuestion = Object.entries(errors)
//     .map(([type, validation]) => ({
//       type,
//       validation,
//     }))
//     .find((item) => item.type === question?.questionType)?.validation.length;

//   const headerStepperStyle = (errorCountInQuestion || 0) === 0 ? '' : 'p-error';

//   return <div className={headerStepperStyle}>{question?.question}</div>;
// };
