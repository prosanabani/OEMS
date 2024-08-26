// import { Button } from 'primereact/button';
// import React from 'react';

// const CustomButton = ({
//   label,
//   onClick,
// }: {
//   readonly label: string;
//   readonly onClick?: () => void;
// }) => {
//   return <Button label={label} onClick={onClick} />;
// };

// export default CustomButton;

import { Button } from 'primereact/button';
import { ButtonProps } from 'primereact/button';
import React from 'react';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    />
  );
};

export default CustomButton;
