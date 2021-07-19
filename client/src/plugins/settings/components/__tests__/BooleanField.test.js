import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BooleanField from '../form/BooleanField';

const defaultProps = {
  label: 'field label',
  value: false,
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<BooleanField {...defaultProps} />);
});

describe('BooleanField', () => {
  test('renders BooleanField component', () => {
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /false/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /true/i })).toBeInTheDocument();
  });

  test('calls the onValueChanged callback handler', () => {
    const trueBtn = screen.queryByText('True');
    const falseBtn = screen.queryByText('False');

    userEvent.click(trueBtn);

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: true,
    });

    userEvent.click(falseBtn);

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: false,
    });
  });
});
