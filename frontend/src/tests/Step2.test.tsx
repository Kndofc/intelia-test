import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Step2 from '../pages/Step2';
import api from '../services/apiConfig';

jest.mock('../services/apiConfig', () => ({
  post: jest.fn(),
}));

describe('Step2 Component', () => {
  it('renders input fields and button', () => {
    render(<Step2 userId={1} onNext={jest.fn()} />);

    expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByText(/Próximo/i)).toBeInTheDocument();
  });

  it('displays error snackbar when fields are empty', async () => {
    render(<Step2 userId={1} onNext={jest.fn()} />);

    fireEvent.click(screen.getByText(/Próximo/i));

    expect(
      await screen.findByText(/Preencha todos os campos obrigatórios/i)
    ).toBeInTheDocument();
  });

  it('calls onNext when form is valid', async () => {
    const mockOnNext = jest.fn();
    const mockApiResponse = { data: { success: true } };

    (api.post as jest.Mock).mockResolvedValueOnce(mockApiResponse);

    render(<Step2 userId={1} onNext={mockOnNext} />);

    fireEvent.change(screen.getByLabelText(/Rua/i), {
      target: { value: 'Rua Principal' },
    });
    fireEvent.change(screen.getByLabelText(/Número/i), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText(/CEP/i), {
      target: { value: '12345-678' },
    });
    fireEvent.change(screen.getByLabelText(/Cidade/i), {
      target: { value: 'São Paulo' },
    });
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: 'SP' },
    });

    fireEvent.click(screen.getByText(/Próximo/i));

    await waitFor(() => expect(mockOnNext).toHaveBeenCalledTimes(1));

    expect(api.post).toHaveBeenCalledWith(`/user/step2/1`, {
      street: 'Rua Principal',
      number: 123,
      zip_code: '12345678',
      city: 'São Paulo',
      state: 'SP',
    });
  });
});
