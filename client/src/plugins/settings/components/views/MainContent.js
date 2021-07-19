import React from 'react';
import Loader from '../shared/Loader';
import Error from '../shared/Error';
import Ui from './UiView';
import Editor from './CodeEditor';
import { Toolbar } from '@material-ui/core';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  viewModeAtom,
  defaultConfigAtom,
  selectedConfigAtom,
} from 'plugins/settings/store';
import { SIDEBAR_WIDTH } from '../shared/Layouts';
import styled from 'styled-components/macro';

const MainContent = () => {
  const viewMode = useRecoilValue(viewModeAtom);
  const selected = useRecoilValue(selectedConfigAtom);
  const { state } = useRecoilValueLoadable(defaultConfigAtom);

  if (state === 'loading') return <Loader />;
  if (state === 'hasError') return <Error msg="Failed to load configs" />;

  return (
    <Wrapper>
      <Toolbar />
      {viewMode ? <Ui selected={selected} /> : <Editor selected={selected} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${SIDEBAR_WIDTH}px);
  height: 100%;
`;

export default MainContent;
