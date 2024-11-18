import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.response.use(
    response => response,
    error => {
      console.error('Erro na API:', error);
      alert(error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.');
      return Promise.reject(error);
    }
  );  

export default api;
