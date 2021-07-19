import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ColorField from '../form/ColorField';

const defaultProps = {
  label: 'white',
  value: '#ffffff',
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<ColorField {...defaultProps} />);
});

describe('ColorField', () => {
  test('renders ColorField component', () => {
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /color value/i })).toHaveValue(
      defaultProps.value
    );
    expect(screen.getByTestId('color-box')).toHaveStyle(
      `background: ${defaultProps.value}`
    );
  });

  test('calls the onValueChanged callback handler', () => {
    const value = '#000000';
    const input = screen.getByRole('textbox', { name: /color value/i });

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value,
    });
  });

  test('does not calls onValueChanged callback handler with invalid value', () => {
    const input = screen.getByRole('textbox', { name: /color value/i });

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledTimes(0);
  });

  test('undo the change by clicking Escape key', () => {
    const input = screen.getByRole('textbox', { name: /color value/i });

    fireEvent.change(input, { target: { value: '#f1f1f1' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: defaultProps.value,
    });
  });
});
