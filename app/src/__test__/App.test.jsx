import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest'
import App from '../App';

test('renders university name', () => {
  render(<App />);
  const linkElement = screen.getByText(/App/);
  expect(linkElement).toBeInTheDocument();
});


// npx vitest