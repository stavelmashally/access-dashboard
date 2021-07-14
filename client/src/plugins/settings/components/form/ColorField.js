import React from 'react';
import EditableField from './EditableField';
import { Input } from 'plugins/settings/components/shared/Layouts';
import { useInputField } from './useInputField';
import styled from 'styled-components';

const isHexColor = colorString => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/i.test(colorString);
};

const ColorField = ({ value, label, onValueChanged, ...props }) => {
  const inputField = useInputField(label, value, onValueChanged);

  return (
    <EditableField label={label} {...props}>
      <Input
        type="text"
        maxLength={7}
        error={!isHexColor(inputField.value)}
        {...inputField}
      />
      <ColorBox background={inputField.value} />
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
