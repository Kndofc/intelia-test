import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Step1 from '../pages/Step1';
import api from '../services/apiConfig';

jest.mock('../services/apiConfig', () => ({
  post: jest.fn(),
}));

describe('Step1 Component', () => {
  it('calls onNext when form is valid', async () => {
    const mockOnNext = jest.fn();
    const mockApiResponse = { data: { userId: 1 } };

    (api.post as jest.Mock).mockResolvedValueOnce(mockApiResponse);

    render(<Step1 onNext={mockOnNext} />);

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: 'João Silva' },
    });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), {
      target: { value: '1990-01-01' },
    });

    fireEvent.click(screen.getByText(/Próximo/i));

    await waitFor(() => expect(mockOnNext).toHaveBeenCalled());

    expect(mockOnNext).toHaveBeenCalledWith(1);
  });

  it('shows error snackbar when fields are empty', async () => {
    render(<Step1 onNext={jest.fn()} />);

    fireEvent.click(screen.getByText(/Próximo/i));

    expect(
      await screen.findByText(/Preencha todos os campos obrigatórios/i)
    ).toBeInTheDocument();
  });
});
