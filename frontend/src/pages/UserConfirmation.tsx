import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CustomButton from '../components/CustomButton';

interface UserConfirmationProps {
  userId: number;
  onBackToHome: () => void;
  onConsultCadastros: () => void;
}

const UserConfirmation: React.FC<UserConfirmationProps> = ({
  userId,
  onBackToHome,
  onConsultCadastros,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '20px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#1c1c1c',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#FFFFFF',
            lineHeight: '1.3',
          }}
        >
          Cadastro Finalizado!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: '15px',
            color: '#CCCCCC',
          }}
        >
          Obrigado por completar seu cadastro.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: '30px',
            color: '#AAAAAA',
          }}
        >
          Seu ID de usuário é: <strong>{userId}</strong>.
        </Typography>
        <Box>
          <CustomButton
            text="Voltar ao Início"
            onClick={onBackToHome}
            variant="contained"
            color="primary"
          />
          <CustomButton
            text="Consultar Cadastros"
            onClick={onConsultCadastros}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserConfirmation;
