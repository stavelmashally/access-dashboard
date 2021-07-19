import React from 'react';
import EditableField from './EditableField';
import Input from 'plugins/settings/components/shared/Input';
import { useInputField } from '../../hooks/useInputField';
import styled from 'styled-components/macro';

const isHexColor = colorString => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/i.test(colorString);
};

const ColorField = ({ value, label, onValueChanged, ...props }) => {
  const inputField = useInputField(value);

  const handleKeyDown = event => {
    const { key, target } = event;
    if (key === 'Enter' && isHexColor(target.value)) {
      onValueChanged({ label, value: target.value });
    }
    if (key === 'Escape') onValueChanged({ label, value });
  };

  return (
    <EditableField label={label} {...props}>
      <Input
        type="text"
        aria-label="color value"
        maxLength={7}
        error={!isHexColor(inputField.value)}
        {...inputField}
        onKeyDown={handleKeyDown}
      />
      <ColorBox data-testid="color-box" background={inputField.value} />
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
