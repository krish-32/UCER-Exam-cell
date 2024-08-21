import { render, screen } from '@testing-library/react';
import App from './App';

test('renders university name', () => {
  render(<App />);
  const linkElement = screen.getByText(/UNIVERSITY COLLEGE OF ENGINEERING RAMANATHAPURAM/i);
  expect(linkElement).toBeInTheDocument();
});


// npx vitest