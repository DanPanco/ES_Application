import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Diagnostic from '../components/Diagnostic';

// Mock pentru scrollIntoView
Object.defineProperty(HTMLDivElement.prototype, 'scrollIntoView', {
    value: jest.fn(),
    writable: true,
});

// Simulăm funcția chat din window.puter.ai pe obiectul global
global.window.puter = {
    ai: {
        chat: jest.fn(() => 'Răspuns simulativ'),
    },
};

describe('Componenta Diagnostic', () => {
    test('ar trebui să afișeze corect componenta Diagnostic', () => {
        render(<Diagnostic />);

        // Verificăm că titlul este prezent
        expect(screen.getByText(/Chat cu HealthYES/i)).toBeInTheDocument();

        // Verificăm că input-ul este prezent
        expect(screen.getByPlaceholderText(/Scrie un mesaj.../i)).toBeInTheDocument();

        // Verificăm că butonul este prezent
        expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
    });

    test('ar trebui să adauge mesajul utilizatorului când input-ul este trimis', async () => {
        render(<Diagnostic />);

        // Simulăm introducerea unui mesaj
        fireEvent.change(screen.getByPlaceholderText(/Scrie un mesaj.../i), {
            target: { value: 'Am dureri de spate' },
        });

        // Simulăm apăsarea butonului de trimitere
        fireEvent.click(screen.getByRole('button', { name: /Send/i }));

        // Verificăm că mesajul utilizatorului a fost adăugat
        expect(screen.getByText('Am dureri de spate')).toBeInTheDocument();
    });

    test('ar trebui să afișeze mesaj de eroare când API-ul eșuează', async () => {
        // Mock pentru eroare de rețea
        global.window.puter.ai.chat.mockImplementationOnce(() => {
            throw new Error('Network Error');
        });

        render(<Diagnostic />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText(/Scrie un mesaj.../i), {
                target: { value: 'Am dureri de spate' },
            });
            fireEvent.click(screen.getByRole('button', { name: /Send/i }));
        });

        await waitFor(() => {
            const errorMessages = screen.queryAllByText(/Eroare la conectarea cu ChatGPT/i);
            expect(errorMessages.length).toBeGreaterThan(0);
        });
    });
});
