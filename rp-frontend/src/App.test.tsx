import React from 'react';
import { render } from '@testing-library/react';
import App from 'App';

test('Titlebar Rendered', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Titlebar/i);
  expect(linkElement).toBeInTheDocument();
});