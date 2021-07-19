import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import EditableList from '../form/EditableList';

const props = {
  label: 'field label',
  value: ['item1', 'item2', 'item3'],
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(<EditableList {...props} />);
});

describe('EditableList', () => {
  test('renders EditableList component', () => {
    expect(screen.getByText(props.label)).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(props.value.length);

    listItems.forEach((item, index) => {
      const input = within(item).getByRole('textbox', {
        name: /item value/i,
      });
      expect(input).toHaveValue(props.value[index]);
    });
  });

  test('calls onValueChanged when adding a new item', () => {
    const newListItem = 'item4';
    const input = screen.getByPlaceholderText('New item');

    fireEvent.change(input, { target: { value: newListItem } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onValueChanged).toBeCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: [...props.value, newListItem],
    });
  });

  test('calls onValueChanged when deleting an item', () => {
    const listItems = screen.getAllByRole('listitem');

    const delBtn = within(listItems[0]).getByRole('button');

    userEvent.click(delBtn);

    expect(props.onValueChanged).toBeCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: [...props.value].slice(1),
    });
  });

  test('calls onValueChanged when changing an item', () => {
    const listItems = screen.getAllByRole('listitem');

    const itemValue = 'hello';
    const input = within(listItems[0]).getByRole('textbox', {
      name: /item value/i,
    });

    fireEvent.change(input, { target: { value: itemValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onValueChanged).toBeCalledTimes(1);
    expect(props.onValueChanged).toHaveBeenCalledWith({
      label: props.label,
      value: [itemValue, ...props.value.slice(1)],
    });
  });
});
