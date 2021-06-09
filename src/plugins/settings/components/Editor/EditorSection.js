import React from 'react';
import Editor from './Editor';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 240px);
  height: 100%;
`;

const EditorSection = () => {
  return (
    <Container>
      <Toolbar />
      <Editor />
    </Container>
  );
};

export default EditorSection;
