import { type TExamCredentials } from '../type';
import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { useFormContext } from 'react-hook-form';

const Footer = () => {
  const { handleSubmit } = useFormContext<TExamCredentials>();
  return (
    <Button
      label={t`Submit`}
      onClick={handleSubmit((FormData) => console.log(FormData))}
    />
  );
};

export default Footer;
