import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import configAtom from 'recoil/configState';

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = () => {
  const config = useRecoilValue(configAtom)
  const value = JSON.stringify(config, null, 2);

  return (
    <EditorContainer>
      <AceEditor
        mode='json'
        fontSize={16}
        width='100%'
        height='100%'
        value={value}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false
        }}
      />
    </EditorContainer>
  );
};

export default Editor;
