import React from 'react';
import Editor from 'plugins/settings/Editor';
import Display from './Display';
import { Toolbar } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { viewModeAtom } from 'recoil/viewMode';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 240px);
  height: 100%;
`;

const EditorSection = () => {
  const viewMode = useRecoilValue(viewModeAtom);

  return (
    <Container>
      <Toolbar />
      {viewMode ? <Display /> : <Editor />}
    </Container>
  );
};

export default EditorSection;
