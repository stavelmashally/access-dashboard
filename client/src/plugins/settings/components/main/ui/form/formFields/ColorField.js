import React from 'react';
import Editable from './Editable';
import { Input} from 'plugins/settings/components/shared/Layout';
import { useState } from 'react';
import styled from 'styled-components';

const ColorField = ({ value, label, onValueChanged, ...props }) => {
  const [input, setInput] = useState(value);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') onValueChanged({ label, value: input });
    if (key === 'Escape') setInput(value);
  };

  const handleInputChanged = e => {
    setInput(e.target.value);
  };

  return (
    <Editable label={label} {...props}>
      <Input
        type="text"
        size={5}
        value={input}
        onChange={handleInputChanged}
        onKeyDown={handleKeyDown}
      />
      <ColorBox background={input} />
    </Editable>
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
