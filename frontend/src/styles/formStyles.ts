import { SxProps, Theme } from '@mui/material/styles';

export const textFieldStyles: SxProps<Theme> = {
  marginBottom: '20px',
  '& .MuiInputBase-root': { color: '#FFFFFF' },
  '& .MuiInputLabel-root': { color: '#CCCCCC' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#CCCCCC' },
    '&:hover fieldset': { borderColor: '#FFFFFF' },
  },
  '@media (max-width: 600px)': {
    '& .MuiInputBase-root': { fontSize: '14px' },
    marginBottom: '10px',
  },
};

export const buttonStyles: SxProps<Theme> = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  color: '#FFFFFF',
  backgroundColor: '#007BFF',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
    padding: '8px',
  },
};

export const pageLayoutStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#000000',
  '@media (max-width: 600px)': {
    padding: '10px',
  },
};
