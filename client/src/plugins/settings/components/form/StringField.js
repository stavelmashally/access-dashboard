import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useInputField } from './useInputField';

const StringField = ({ value, label, onValueChanged, ...props }) => {
  const inputField = useInputField(label, value, onValueChanged);

  return (
    <EditableField label={label} {...props}>
      <Input type="text" {...inputField} />
    </EditableField>
  );
};

export default StringField;
