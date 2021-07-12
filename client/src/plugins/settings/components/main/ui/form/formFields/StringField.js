import React, { useState } from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layout';

const StringField = ({ value, label, onValueChanged, ...props }) => {
  const [input, setInput] = useState(value);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') onValueChanged({ label, value: input });
    if (key === 'Escape') setInput(value);
  };

  const handleInputChanged = e => {
    setInput(e.target.value);
  };

  return (
    <EditableField label={label} {...props}>
      <Input
        type="text"
        value={input}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
      />
    </EditableField>
  );
};

export default StringField;
