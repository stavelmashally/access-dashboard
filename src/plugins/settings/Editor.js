import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom } from 'recoil/config';
import styled from 'styled-components';
import * as access from 'plugins/access';

const EditorContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Editor = () => {
  const selected = useRecoilValue(selectedConfigAtom);

  const config = selected ? access[selected]() : '';
  const code = JSON.stringify(config, null, 2);

  const handleChange = newValue => {};

  const options = {
    tabSize: 2,
    showLineNumbers: true,
    enableLiveAutocompletion: true,
    useWorker: false,
  };

  return (
    <EditorContainer>
      <AceEditor
        mode='json'
        fontSize={16}
        width='100%'
        height='100%'
        value={code}
        onChange={handleChange}
        debounceChangePeriod={800}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: true }}
        setOptions={options}
      />
    </EditorContainer>
  );
};

export default Editor;
