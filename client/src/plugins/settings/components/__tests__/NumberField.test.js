import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NumberField from '../form/NumberField';

const defaultProps = {
  label: 'field label',
  value: 10,
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<NumberField {...defaultProps} />);
});

describe('NumberField', () => {
  test('renders NumberField component', () => {
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /number value/i })
    ).toHaveValue(defaultProps.value);
  });

  test('calls the onValueChanged callback handler', () => {
    const value = 150;
    const input = screen.getByRole('spinbutton', { name: /number value/i });

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value,
    });
  });

  test('undo the change by clicking Escape key', () => {
    const input = screen.getByRole('spinbutton', { name: /number value/i });

    fireEvent.change(input, { target: { value: 150 } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: defaultProps.value,
    });
  });
});
