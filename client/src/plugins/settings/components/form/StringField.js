import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useInputField } from './useInputField';

const StringField = ({ value, label, onValueChanged, ...props }) => {
  const inputField = useInputField(value);

  const handleKeyDown = event => {
    const { key, target } = event;
    if (key === 'Enter' && target.value.trim(' ').length > 0) {
      onValueChanged({ label, value: target.value });
    }
    if (key === 'Escape') onValueChanged({ label, value });
  };

  return (
    <EditableField label={label} {...props}>
      <Input type="text" {...inputField} onKeyDown={handleKeyDown} />
    </EditableField>
  );
};

export default StringField;
