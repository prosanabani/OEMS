/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

export const ActionBodyTemplate = () => {
  return (
    <div className="">
      <Button
        className="p-button-rounded mr-2"
        icon="pi pi-pencil"
        severity="success"
      />
      <Button
        className="p-button-rounded mr-2"
        icon="pi pi-trash"
        severity="danger"
      />
    </div>
  );
};

export const QuestionTypeBodyTemplate = (rowData: any) => {
  const questionTypeObject: { [key: string]: JSX.Element } = {
    multipleChoice: <Tag severity="info" value="Multiple Choice" />,
    theoretical: <Tag severity="danger" value="Theoretical" />,
    trueOrFalse: <Tag severity="success" value="True or False" />,
  };
  return <div>{questionTypeObject[rowData.questionType]}</div>;
};
