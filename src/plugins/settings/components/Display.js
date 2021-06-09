import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Display = () => {
  return (
    <Container>
      <h1>Ui Mode</h1>
    </Container>
  );
};

export default Display;
