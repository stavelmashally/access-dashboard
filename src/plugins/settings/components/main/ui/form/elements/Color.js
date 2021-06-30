import React from 'react';
import { isLight } from 'plugins/settings/utils/colorUtils';
import styled from 'styled-components';

const Color = ({ label, value }) => {
  return (
    <ColorBox background={value} color={isLight(value) ? 'black' : 'white'}>
      {label}
    </ColorBox>
  );
};

const ColorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  background: ${props => props.background};
  width: 100px;
  height: 100px;
  border: 1px solid lightgray;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
  border-radius: 10px;
`;

export default Color;
