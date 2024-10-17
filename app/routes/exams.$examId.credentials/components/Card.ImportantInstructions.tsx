import { t, Trans } from '@lingui/macro';
import { ListBox } from 'primereact/listbox';
import { Message } from 'primereact/message';
import { type SelectItem } from 'primereact/selectitem';

const ImportantInstructions = () => {
  const examGuidelinesList: SelectItem[] = [
    {
      label: t`Ensure your internet connection is stable to avoid interruptions.`,
    },
    {
      label: t`Remember that AI is actively monitoring your exam session for exam integrity.`,
    },
    {
      label: t`If you cheat during the exam, you will be awarded 0 marks.`,
    },
    {
      label: t`Don't close the browser during the exam.`,
    },
    {
      label: t`Don't switch tabs during the exam.`,
    },
    {
      label: t`Don't refresh the page during the exam.`,
    },
    {
      label: t`Don't minimize the browser during the exam while in full-screen mode.`,
    },
  ];

  const instructionTemplate = (instruction: SelectItem) => (
    <div className="flex items-center">
      <i className="i-gridicons:notice mr-2 text-red  w-20px h-20px" />
      <span>{instruction.label}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <Message
        severity="info"
        text={
          <Trans>
            Please read the following guidelines carefully before starting your
            exam:
          </Trans>
        }
      />

      <ListBox
        itemTemplate={instructionTemplate}
        options={examGuidelinesList}
      />
    </div>
  );
};

export default ImportantInstructions;
