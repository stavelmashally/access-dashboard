import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import FormHeader from '../form/FormHeader';
import StringField from '../form/StringField';

const props = {
  title: 'header title',
  onSubmit: jest.fn(),
  onDelete: jest.fn(),
  onAdd: jest.fn(),
};

const childrenProps = {
  label: 'field label',
  value: 'field value',
  onValueChanged: jest.fn(),
};

beforeEach(() => {
  render(
    <FormHeader {...props}>
      <StringField {...childrenProps} />
    </FormHeader>
  );
});

describe('FormHeader', () => {
  test('renders FormHeader component with children', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(props.title);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(childrenProps.label)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /string value/i })).toHaveValue(
      childrenProps.value
    );
  });

  test('click on expand button renders unexpanded mode', () => {
    const expandBtn = screen.getByRole('button');

    userEvent.click(expandBtn);

    expect(screen.getByRole('heading')).toHaveTextContent(props.title);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(childrenProps.label)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: /string value/i })
    ).not.toBeInTheDocument();
  });

  test('renders edit mode onDoubleClick', () => {
    const title = screen.getByRole('heading');

    userEvent.dblClick(title);

    expect(screen.getByRole('textbox', { name: /title value/i })).toHaveValue(
      props.title
    );
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('calls onSubmit with new title value on Enter key down', () => {
    const title = screen.getByRole('heading');

    userEvent.dblClick(title);

    const input = screen.getByRole('textbox', { name: /title value/i });
    const value = 'new title';

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith({ value });
  });

  test('undo title change on Escape key down', () => {
    const title = screen.getByRole('heading');

    userEvent.dblClick(title);

    const input = screen.getByRole('textbox', { name: /title value/i });
    const value = 'new title';

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(screen.getByRole('heading')).toHaveTextContent(props.title);
  });
});
