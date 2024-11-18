import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import InputMask from 'react-input-mask';
import PageLayout from '../components/PageLayout';
import { textFieldStyles, buttonStyles } from '../styles/formStyles';
import api from '../services/apiConfig';
import '../components/CustomProgressBar';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-progress-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface Step3Props {
  userId: number;
  onSubmit: () => void;
}

const Step3: React.FC<Step3Props> = ({ userId, onSubmit }) => {
  const [formData, setFormData] = useState({ phone: '', mobile: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const progressRef = useRef<HTMLElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.phone || !formData.mobile) {
      setSnackbar({ open: true, message: 'Preencha todos os campos obrigatórios.', severity: 'error' });
      return;
    }

    try {
      if (progressRef.current) {
        (progressRef.current as any).value = 0;
      }

      for (let i = 0; i <= 100; i += 25) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (progressRef.current) {
          (progressRef.current as any).value = i;
        }
      }

      await api.post(`/user/step3/${userId}`, formData);
      onSubmit();
      setSnackbar({ open: true, message: 'Cadastro concluído com sucesso!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Erro ao enviar os dados.', severity: 'error' });
    }
  };

  return (
    <PageLayout>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#FFFFFF', lineHeight: '1.2' }}>
        Etapa 3: <br /> Contatos
      </Typography>
      <custom-progress-bar ref={(el: HTMLElement | null) => (progressRef.current = el)}></custom-progress-bar>
      <InputMask mask="(99) 9999-9999" value={formData.phone} onChange={handleChange}>
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            fullWidth
            label="Telefone Fixo"
            name="phone"
            margin="normal"
            required
            sx={textFieldStyles}
          />
        )}
      </InputMask>
      <InputMask mask="(99) 9 9999-9999" value={formData.mobile} onChange={handleChange}>
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            fullWidth
            label="Telefone Celular"
            name="mobile"
            margin="normal"
            required
            sx={textFieldStyles}
          />
        )}
      </InputMask>
      <Button variant="contained" onClick={handleSubmit} sx={buttonStyles}>
        Finalizar
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

export default Step3;
