import React from 'react';
import { Box, Paper } from '@mui/material';
import { pageLayoutStyles } from '../styles/formStyles';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={pageLayoutStyles}>
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#1c1c1c',
          borderRadius: '10px',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PageLayout;
