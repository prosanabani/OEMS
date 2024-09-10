import { Logout } from '../utils/functions';
import { Button } from 'primereact/button';
import React from 'react';

const LogoutButton: React.FC = () => {
  return <Button onClick={Logout}>Logout</Button>;
};

export default LogoutButton;
