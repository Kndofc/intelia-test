import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import logo from '../assets/intelia-logo.png';
import wallpaper from '../assets/wallpaper.png';

interface HomePageProps {
  onStartNewRegistration: () => void;
  onConsultCadastros: () => void;
  onContinueRegistration: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  onStartNewRegistration,
  onConsultCadastros,
  onContinueRegistration,
}) => {
  const handleNewRegistrationClick = () => {
    const hasIncompleteRegistration =
      localStorage.getItem('incompleteStep') && localStorage.getItem('incompleteUserId');
    if (hasIncompleteRegistration) {
      if (window.confirm('Você tem um cadastro incompleto. Deseja continuar?')) {
        onContinueRegistration();
      } else {
        onStartNewRegistration();
      }
    } else {
      onStartNewRegistration();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#000000', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="Intelia Logo" style={{ width: '150px' }} />
          <Typography variant="h6">Bem-vindo ao Portal Intelia</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box textAlign="center" py={5}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              marginBottom: '20px',
              textShadow: '2px 2px 5px rgba(0,0,0,0.7)',
            }}
          >
            A PhoneTrack evoluiu e agora é Intelia
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '40px',
              color: '#CCCCCC',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            Intelia é líder em inovação e tecnologia, proporcionando inteligência em cada conexão.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={handleNewRegistrationClick}
                sx={{
                  padding: '10px 20px',
                  color: '#FFFFFF',
                  backgroundColor: '#007BFF',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Novo Cadastro
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={onConsultCadastros}
                sx={{
                  padding: '10px 20px',
                  color: '#FFFFFF',
                  backgroundColor: '#007BFF',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Consultar Cadastros
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        sx={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#000000',
          color: '#CCCCCC',
        }}
      >
        <Typography variant="body2">&copy; 2024 Intelia. Todos os direitos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
