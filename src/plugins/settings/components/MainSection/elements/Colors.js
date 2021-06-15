import React from 'react';
import { isLight } from 'utils/colorUtils';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ColorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  background: ${props => props.background};
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

const Colors = ({ values }) => {
  const renderColors = () =>
    Object.entries(values).map(([key, value]) => (
      <ColorBox background={value} color={isLight(value) ? 'black' : 'white'}>
        {key}
      </ColorBox>
    ));

  return <Container>{renderColors()}</Container>;
};

export default Colors;
