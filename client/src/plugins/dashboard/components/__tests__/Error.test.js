import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Error from '../shared/Error';

describe('Error', () => {
  test('renders Error component with default msg', () => {
    render(<Error />);

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  test('renders Error component with msg', () => {
    const msg = 'error message';

    render(<Error msg={msg} />);

    expect(screen.getByText(msg)).toBeInTheDocument();
  });
});
