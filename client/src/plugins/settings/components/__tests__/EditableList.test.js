import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import EditableList from '../form/EditableList';

const defaultProps = {
  label: 'field label',
  value: ['item1', 'item2', 'item3'],
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<EditableList {...defaultProps} />);
});

describe('EditableList', () => {
  test('renders EditableList component', () => {
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(defaultProps.value.length);

    listItems.forEach((item, index) => {
      const { getByRole } = within(item);
      expect(getByRole('textbox', { name: /item value/i })).toHaveValue(
        defaultProps.value[index]
      );
    });
  });

  test('calls onValueChanged when adding a new item', () => {
    const newListItem = 'item4';
    const input = screen.getByPlaceholderText('New item');

    fireEvent.change(input, { target: { value: newListItem } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: [...defaultProps.value, newListItem],
    });
  });

  test('calls onValueChanged when deleting an item', () => {
    const listItems = screen.getAllByRole('listitem');

    const { getByRole } = within(listItems[0]);
    const delBtn = getByRole('button');

    userEvent.click(delBtn);

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: [...defaultProps.value].slice(1),
    });
  });

  test('calls onValueChanged when changing an item', () => {
    const listItems = screen.getAllByRole('listitem');

    const { getByRole } = within(listItems[0]);
    const itemValue = 'hello';
    const input = getByRole('textbox', { name: /item value/i });

    fireEvent.change(input, { target: { value: itemValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onValueChanged).toHaveBeenCalledWith({
      label: defaultProps.label,
      value: [itemValue, ...defaultProps.value.slice(1)],
    });
  });
});
