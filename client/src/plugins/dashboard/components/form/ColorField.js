import React from 'react';
import styled from 'styled-components/macro';

const ColorField = ({ fieldValue, onValueChanged, isEditMode }) => {
  return isEditMode ? (
    <InputColor
      aria-label="color value"
      value={fieldValue}
      onChange={e => onValueChanged(e.target.value)}
    />
  ) : (
    <ColorBox background={fieldValue} />
  );
};

const InputColor = styled.input.attrs({ type: 'color' })`
  border: none;
  width: 35px;
  height: 35px;
`;

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
