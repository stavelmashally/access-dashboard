import React from 'react';
import Editable from './Editable';
import { Input } from 'plugins/settings/components/shared/Layout';
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
    <Editable label={label} {...props}>
      <Input
        type='number'
        value={input}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
      />
    </Editable>
  );
};

export default NumberField;
