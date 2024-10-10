import { t, Trans } from '@lingui/macro';
import { ListBox } from 'primereact/listbox';
import { Message } from 'primereact/message';
import { type SelectItem } from 'primereact/selectitem';

const ImportantInstructions = () => {
  const examGuidelinesList: SelectItem[] = [
    {
      label: t`Make sure you are in a quiet environment with minimal distractions.`,
    },
    {
      label: t`Ensure your internet connection is stable to avoid interruptions.`,
    },
    {
      label: t`Remember that AI is actively monitoring your exam session for exam integrity.`,
    },
    {
      label: t`Please note that you are being monitored by AI during the exam to ensure a secure and fair experience.`,
    },
    {
      label: t`Your privacy is safeguarded, and all monitoring is strictly for exam integrity.`,
    },
    {
      label: t`In case you cheat during the exam, you will be awarded 0 marks.`,
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
