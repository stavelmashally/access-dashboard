import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useState } from 'react';
import styled from 'styled-components';

const isHexColor = colorString => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/i.test(colorString);
};

const ColorField = ({ value, label, onValueChanged, ...props }) => {
  const [input, setInput] = useState(value);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') onValueChanged({ label, value: input });
    if (key === 'Escape') setInput(value);
  };

  const handleInputChanged = e => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith('#')) return;
    setInput(inputValue);
  };

  return (
    <EditableField label={label} {...props}>
      <Input
        type="text"
        maxLength={7}
        value={input}
        error={!isHexColor(input)}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
      />
      <ColorBox background={input} />
    </EditableField>
  );
};

const ColorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.background || '#fff'};
  width: 35px;
  height: 35px;
  border: 1px solid lightgray;
`;

export default ColorField;
