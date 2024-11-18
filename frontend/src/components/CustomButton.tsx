import React from 'react';
import { Button } from '@mui/material';
import { buttonStyles } from '../styles/formStyles';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, variant = 'contained', color = 'primary' }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      sx={buttonStyles}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
