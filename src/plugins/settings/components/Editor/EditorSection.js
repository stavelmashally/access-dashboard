import React from 'react';
import Editor from './Editor';
import Loader from '../Loader';
import Error from '../Error';
import Display from '../Display';
import { Toolbar } from '@material-ui/core';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  viewModeAtom,
  defaultConfigAtom,
  restoreAtom,
} from 'plugins/settings/store';
import { SIDEBAR_WIDTH } from '../Layout';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100%;
`;

const EditorSection = () => {
  const { state } = useRecoilValueLoadable(defaultConfigAtom);
  const viewMode = useRecoilValue(viewModeAtom);
  useRecoilValue(restoreAtom);

  const error = state === 'hasError';
  const loading = state === 'loading';
  const content = viewMode ? <Display /> : <Editor />;

  return (
    <Container>
      <Toolbar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error text='Error while trying to load configs' />
      ) : (
        content
      )}
    </Container>
  );
};

export default EditorSection;
