import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import StringField from '../form/StringField';

const defaultProps = {
  label: 'field label',
  value: 'field value',
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<StringField {...defaultProps} />);
});

describe('StringField', () => {
  test('renders StringField component', () => {
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /string value/i })).toHaveValue(
      defaultProps.value
    );
  });

  test('calls the onValueChanged callback handler', () => {
    const value = 'hello';
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value,
    });
  });

  test('does not call onValueChanged with invalid value', () => {
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledTimes(0);
  });

  test('undo the change by clicking Escape key', () => {
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: defaultProps.value,
    });
  });
});
