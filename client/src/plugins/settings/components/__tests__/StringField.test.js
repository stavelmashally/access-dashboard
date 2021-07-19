import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import StringField from '../form/StringField';

const props = {
  label: 'field label',
  value: 'field value',
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<StringField {...props} />);
});

describe('StringField', () => {
  test('renders StringField component', () => {
    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /string value/i })).toHaveValue(
      props.value
    );
  });

  test('calls the onValueChanged callback handler', () => {
    const value = 'hello';
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value,
    });
  });

  test('does not call onValueChanged with invalid value', () => {
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onValueChanged).toHaveBeenCalledTimes(0);
  });

  test('undo the change by clicking Escape key', () => {
    const input = screen.getByRole('textbox', { name: /string value/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(props.onValueChanged).toHaveBeenCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: props.value,
    });
  });
});
