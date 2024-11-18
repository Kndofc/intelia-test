import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Pagination,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import CustomTable from '../components/CustomTable';
import api from '../services/apiConfig';

interface User {
  id: number;
  name: string;
  birthdate: string;
  street?: string;
  number?: number;
  zip_code?: string;
  city?: string;
  state?: string;
  phone?: string;
  mobile?: string;
}

const ConsultCadastros: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'birthdate', label: 'Data de Nascimento' },
    { key: 'street', label: 'Rua' },
    { key: 'number', label: 'Número' },
    { key: 'zip_code', label: 'CEP' },
    { key: 'city', label: 'Cidade' },
    { key: 'state', label: 'Estado' },
    { key: 'phone', label: 'Telefone' },
    { key: 'mobile', label: 'Celular' },
  ];

  const fetchUsers = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await api.get('/users', { params: { page: currentPage } });
      setUsers(response.data.data);
      setTotalPages(response.data.meta.pages); // Atualiza o total de páginas baseado na resposta do backend
    } catch (error) {
      console.error('Erro ao buscar cadastros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFFFF',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#1c1c1c',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '30px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '20px',
            textShadow: '1px 1px 3px rgba(255, 255, 255, 0.2)',
          }}
        >
          Lista de Cadastros
        </Typography>
        {loading ? (
          <TableContainer component={Paper} sx={{ backgroundColor: '#1c1c1c', borderRadius: '8px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index} sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {headers.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <CustomTable headers={headers} rows={users} />
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                color: '#FFFFFF',
                '.MuiPaginationItem-root': {
                  color: '#FFFFFF',
                },
                '.Mui-selected': {
                  backgroundColor: '#007BFF',
                  color: '#FFFFFF',
                },
              }}
            />
          </>
        )}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onBackToHome}
            sx={{
              backgroundColor: '#007BFF',
              '&:hover': { backgroundColor: '#0056b3' },
              color: '#FFFFFF',
            }}
          >
            Voltar ao Início
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ConsultCadastros;
