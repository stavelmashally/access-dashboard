import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useState } from 'react';

const NumberField = ({ value, label, onValueChanged, ...props }) => {
  const [input, setInput] = useState(value);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') onValueChanged({ label, value: input });
    if (key === 'Escape') setInput(value);
  };

  const handleInputChanged = e => {
    setInput(Number(e.target.value));
  };

  return (
    <EditableField label={label} {...props}>
      <Input
        type="number"
        value={input}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
      />
    </EditableField>
  );
};

export default NumberField;
