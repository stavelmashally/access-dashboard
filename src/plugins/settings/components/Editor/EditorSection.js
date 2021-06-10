import React from 'react';
import Editor from './Editor';
import Loader from '../Loader';
import Error from '../Error';
import { Toolbar } from '@material-ui/core';
import { useRecoilValueLoadable } from 'recoil';
import { fetchConfigSelector } from 'plugins/settings/store';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 240px);
  height: 100%;
`;

const EditorSection = () => {
  const { state } = useRecoilValueLoadable(fetchConfigSelector);

  const error = state === 'hasError';
  const loading = state === 'loading';

  return (
    <Container>
      <Toolbar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error text='Error while trying to load configs' />
      ) : (
        <Editor />
      )}
    </Container>
  );
};

export default EditorSection;
