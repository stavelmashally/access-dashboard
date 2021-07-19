import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import EditableField from '../form/EditableField';

const props = {
  label: 'field label',
  onLabelChanged: jest.fn(),
  onDelete: jest.fn(),
};

const inputValue = '123';

beforeEach(() => {
  render(
    <EditableField {...props}>
      <input defaultValue={inputValue} />
    </EditableField>
  );
});

describe('EditableField', () => {
  test('renders EditableField component', () => {
    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(inputValue);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders input field & delete button when onDoubleClick called', () => {
    userEvent.dblClick(screen.getByText(props.label));

    expect(screen.getByRole('textbox', { name: /label value/i })).toHaveValue(
      props.label
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls the onLabelChange callback handler', () => {
    const value = 'new input value';

    userEvent.dblClick(screen.getByText(props.label));

    const input = screen.getByRole('textbox', { name: /label value/i });

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onLabelChanged).toHaveBeenCalledTimes(1);
    expect(props.onLabelChanged).toHaveBeenCalledWith({
      label: props.label,
      value,
    });
  });

  test('undo the change by clicking Escape key', () => {
    userEvent.dblClick(screen.getByText(props.label));

    const input = screen.getByRole('textbox', { name: /label value/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(props.onLabelChanged).toHaveBeenCalledTimes(1);
    expect(props.onLabelChanged).toHaveBeenCalledWith({
      label: props.label,
      value: props.label,
    });
  });
});
