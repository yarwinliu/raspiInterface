import React from 'react';
import { render } from '@testing-library/react';

import App from 'App';


test('Main Rendered', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('main')).toBeInTheDocument();
});