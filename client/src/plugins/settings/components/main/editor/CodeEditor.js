import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import { useSetRecoilState } from 'recoil';
import { hasErrorAtom } from 'plugins/settings/store';
import styled from 'styled-components';
import { useAccess } from 'plugins/settings/hooks/useAccess';

const CodeEditor = ({ selected }) => {
  const hasError = useSetRecoilState(hasErrorAtom);
  const { getConfig, replaceConfig } = useAccess(selected);

  const code = getConfig();

  const handleChange = newCode => {
    try {
      const config = JSON.parse(newCode);
      replaceConfig(config);
      hasError(false);
    } catch (error) {
      hasError(true);
    }
  };

  return (
    <Wrapper>
      <AceEditor
        mode="json"
        fontSize={16}
        tabSize={2}
        width="100%"
        height="100%"
        value={code}
        onChange={handleChange}
        debounceChangePeriod={500}
        showPrintMargin={false}
        enableLiveAutocompletion
        CodeeditorProps={{ $blockScrolling: true }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export default CodeEditor;
