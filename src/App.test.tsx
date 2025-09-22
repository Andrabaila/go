import { render, screen } from '@testing-library/react';
import App from './App';

test('рендерит заголовок', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /walking game/i });
  expect(heading).toBeInTheDocument();
});
