import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import EditableField from '../form/EditableField';

const props = {
  label: 'label value',
  value: 'field value',
  onFieldChanged: jest.fn(),
  onDelete: jest.fn(),
};

beforeEach(() => {
  render(<EditableField {...props} />);
});

describe('EditableField', () => {
  test.todo('renders EditableField component');

  test.todo('renders input field & delete button when onDoubleClick called');

  test.todo('calls the onLabelChange callback handler');

  test.todo('undo the change by clicking Escape key');
});
