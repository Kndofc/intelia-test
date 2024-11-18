import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import InputMask from 'react-input-mask';
import PageLayout from '../components/PageLayout';
import { textFieldStyles, buttonStyles } from '../styles/formStyles';
import api from '../services/apiConfig';

interface Step2Props {
  userId: number;
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ userId, onNext }) => {
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    zip_code: '',
    city: '',
    state: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'state' && value.length > 2) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.street || !formData.number || !formData.zip_code || !formData.city || !formData.state) {
      setSnackbar({ open: true, message: 'Preencha todos os campos obrigatórios.', severity: 'error' });
      return;
    }
  
    try {
      const sanitizedZipCode = formData.zip_code.replace('-', '');
      await api.post(`/user/step2/${userId}`, {
        ...formData,
        zip_code: sanitizedZipCode,
        number: parseInt(formData.number),
      });
      setSnackbar({ open: true, message: 'Etapa 2 concluída com sucesso!', severity: 'success' });
      onNext(); // Apenas uma chamada
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
        Etapa 2: <br /> Endereço
      </Typography>
      <TextField
        fullWidth
        label="Rua"
        name="street"
        value={formData.street}
        onChange={handleChange}
        margin="normal"
        required
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Número"
        name="number"
        type="number"
        value={formData.number}
        onChange={handleChange}
        margin="normal"
        required
        sx={textFieldStyles}
      />
      <InputMask
        mask="99999-999"
        value={formData.zip_code}
        onChange={handleChange}
      >
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            fullWidth
            label="CEP"
            name="zip_code"
            margin="normal"
            required
            sx={textFieldStyles}
          />
        )}
      </InputMask>
      <TextField
        fullWidth
        label="Cidade"
        name="city"
        value={formData.city}
        onChange={handleChange}
        margin="normal"
        required
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Estado"
        name="state"
        value={formData.state}
        onChange={handleChange}
        margin="normal"
        required
        inputProps={{ maxLength: 2 }}
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

export default Step2;
