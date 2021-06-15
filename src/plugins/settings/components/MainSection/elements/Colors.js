import React from 'react';
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
  background: ${props => props.color};
  width: 100px;
  height: 100px;
  border: 1px solid black;
  color: white;
`;

const Colors = ({ values }) => {
  const renderColors = () =>
    Object.entries(values).map(([key, value]) => (
      <ColorBox color={value}>{key}</ColorBox>
    ));

  return <Container>{renderColors()}</Container>;
};

export default Colors;
