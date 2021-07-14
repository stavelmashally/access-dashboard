import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useInputField } from './useInputField';

const NumberField = ({ value, label, onValueChanged, ...props }) => {
  const inputField = useInputField(label, value, onValueChanged);

  return (
    <EditableField label={label} {...props}>
      <Input type="number" {...inputField} />
    </EditableField>
  );
};

export default NumberField;
