import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// TODO GTB-2: - 需要保证npm run test不会挂掉
test('should render App', () => {
  const { getByTestId } = render(<App />);
  const app = getByTestId('app');

  expect(app).not.toBeEmptyDOMElement();
});
