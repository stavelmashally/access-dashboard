import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BooleanField from '../form/BooleanField';

const props = {
  label: 'field label',
  value: false,
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<BooleanField {...props} />);
});

describe('BooleanField', () => {
  test('renders BooleanField component', () => {
    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /false/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /true/i })).toBeInTheDocument();
  });

  test('calls the onValueChanged callback handler', () => {
    const trueBtn = screen.queryByText('True');
    const falseBtn = screen.queryByText('False');

    userEvent.click(trueBtn);

    expect(props.onValueChanged).toHaveBeenCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: true,
    });

    userEvent.click(falseBtn);

    expect(props.onValueChanged).toHaveBeenCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: false,
    });
  });
});
