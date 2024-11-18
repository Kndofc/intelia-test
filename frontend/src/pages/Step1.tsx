import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import PageLayout from '../components/PageLayout';
import { textFieldStyles, buttonStyles } from '../styles/formStyles';
import api from '../services/apiConfig';

interface Step1Props {
  onNext: (userId: number) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [formData, setFormData] = useState({ name: '', birthdate: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
      if (!regex.test(value)) return;
    }
  
    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async () => {
    if (!formData.name || !formData.birthdate) {
      setSnackbar({ open: true, message: 'Preencha todos os campos obrigatórios.', severity: 'error' });
      return;
    }

    try {
      const response = await api.post('/user/step1', formData);
      onNext(response.data.userId);
      setSnackbar({ open: true, message: 'Etapa 1 concluída com sucesso!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erro ao enviar os dados.', severity: 'error' });
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <PageLayout>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#FFFFFF',
          lineHeight: '1.2',
        }}
      >
        Etapa 1: <br /> Informações Básicas
      </Typography>
      <TextField
        fullWidth
        label="Nome Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Data de Nascimento"
        name="birthdate"
        type="date"
        value={formData.birthdate}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
        sx={textFieldStyles}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={buttonStyles}
      >
        Próximo
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity as any} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
};

export default Step1;
