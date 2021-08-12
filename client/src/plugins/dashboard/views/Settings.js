import React, { useState } from 'react';
import Label from '../components/shared/Label';
import Loader from '../components/shared/Loader';
import PrefixInput from '../components/shared/PrefixInput';
import { Typography, Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { endpointsAtom, configAtom } from 'plugins/dashboard/store/data';
import { BASE_URL } from 'plugins/dashboard/api';
import styled from 'styled-components';

const Settings = () => {
  const [fetchEndpoint, setFetchEndpoint] = useState('');
  const [postEndpoint, setPostEndpoint] = useState('');
  const [endpoints, setEndpoints] = useRecoilState(endpointsAtom);
  const { state } = useRecoilValueLoadable(configAtom);

  const handleSubmit = () => {
    if (!fetchEndpoint || !postEndpoint) return;
    setEndpoints({ fetchEndpoint, postEndpoint });
  };

  const renderFormFields = () => {
    return (
      <>
        <FieldWrapper>
          <Label>Load from</Label>
          <PrefixInput
            text={BASE_URL}
            onChange={e => setFetchEndpoint(e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Label>Save to</Label>
          <PrefixInput
            text={BASE_URL}
            onChange={e => setPostEndpoint(e.target.value)}
          />
        </FieldWrapper>
      </>
    );
  };

  return (
    <Wrapper>
      <Typography variant="h4">Settings</Typography>
      {renderFormFields()}
      <Button
        variant="contained"
        color='primary'
        startIcon={<Publish />}
        onClick={handleSubmit}
      >
        Load
      </Button>
      {state === 'loading' && <Loader />}
      {state === 'hasError' && endpoints.fetchEndpoint && (
        <Error>Failed to load configs</Error>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Error = styled.span`
  color: red;
`;

export default Settings;
