import { render, screen} from '@testing-library/react';
import LandingPage from '../componentes/LandingPage'
import { MemoryRouter } from 'react-router-dom';

test('Renderiza texto de bienvenida', () => {
    <h1 className='titulo'>Videogame website project | made by Rodrigo Guevara Civit</h1>
    render(<LandingPage />, { wrapper: MemoryRouter})

    expect(screen.getByText('Wellcome to my  Videogames Page')).toBeInTheDocument()
}) 