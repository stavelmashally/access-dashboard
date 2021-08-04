import React from 'react';
import Loader from '../components/shared/Loader';
import Ui from './UiView';
import Editor from './CodeEditor';
import Settings from './Settings';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { viewModeAtom, selectedAtom } from 'plugins/dashboard/store/ui';
import { configAtom } from 'plugins/dashboard/store/data';
import { SIDEBAR_WIDTH, TOOLBAR_HEIGHT } from '../components/shared/Layouts';
import styled from 'styled-components/macro';

const MainContent = () => {
  const viewMode = useRecoilValue(viewModeAtom);
  const selected = useRecoilValue(selectedAtom);
  const { state } = useRecoilValueLoadable(configAtom);

  if (state === 'loading') return <Loader />;
  if (state === 'hasError') return <Settings isError/>;

  return (
    <Wrapper>
      {viewMode ? <Ui selected={selected} /> : <Editor selected={selected} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: ${SIDEBAR_WIDTH}px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default MainContent;
