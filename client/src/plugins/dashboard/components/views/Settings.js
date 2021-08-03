import React, { useState } from 'react';
import Label from '../shared/Label';
import PrefixInput from '../shared/PrefixInput';
import { useSetRecoilState } from 'recoil';
import { configEndpointsAtom } from 'plugins/dashboard/store';
import { BASE_URL } from 'plugins/dashboard/api';
import styled from 'styled-components';

const Settings = () => {
  const [fetchEndpoint, setFetchEndpoint] = useState('');
  const [saveEndpoint, setSaveEndpoint] = useState('');
  const setEndpoints = useSetRecoilState(configEndpointsAtom);

  const handleSubmit = () => {
    if (!fetchEndpoint || !saveEndpoint) return;
    setEndpoints({ fetchUrl: fetchEndpoint, postUrl: saveEndpoint });
  };

  return (
    <Wrapper>
      <h1>Settings</h1>
      <FieldWrapper>
        <Label>Fetch from:</Label>
        <PrefixInput
          text={BASE_URL}
          onChange={e => setFetchEndpoint(e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Post to:</Label>
        <PrefixInput
          text={BASE_URL}
          onChange={e => setSaveEndpoint(e.target.value)}
        />
      </FieldWrapper>
      <button onClick={handleSubmit}>Submit</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export default Settings;
