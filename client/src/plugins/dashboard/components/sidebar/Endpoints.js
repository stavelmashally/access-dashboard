import React from 'react';
import { Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { endpointsAtom } from 'plugins/dashboard/store/data';
import { confirmModalAtom } from 'plugins/dashboard/store/ui';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PrefixInput from '../shared/PrefixInput';
import styled from 'styled-components';

const Endpoints = () => {
  const [{ fetchEndpoint, postEndpoint }, setEndpoints] =
    useRecoilState(endpointsAtom);
  const confirmModal = useSetRecoilState(confirmModalAtom);

  const handleEditEndpoints = () => {
    setEndpoints({ fetchEndpoint: null, postEndpoint: null });
  };

  return (
    <Wrapper>
      <Field>
        <PrefixInput disabled text="GET" value={`${fetchEndpoint}`} />
      </Field>
      <Field>
        <PrefixInput disabled text="POST" value={`${postEndpoint}`} />
      </Field>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        onClick={() =>
          confirmModal({
            message: 'Are you sure you want to edit the endpoints?',
            onConfirm: handleEditEndpoints,
          })
        }
      >
        Edit
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default Endpoints;
