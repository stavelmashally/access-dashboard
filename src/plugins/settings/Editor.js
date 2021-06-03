import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/ext-language_tools';
import * as access from '../access';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  padding-top: 2px;
  height: 100%;
`;

const Editor = () => {
  console.log(access.icon());

  return (
    <EditorContainer>
      <AceEditor
        mode='javascript'
        fontSize={16}
        width='100%'
        height='100%'
        showPrintMargin={false}
        value={`console.log("i've loaded");`}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </EditorContainer>
  );
};

export default Editor;
