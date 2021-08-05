import React from 'react';
import { endpointsAtom } from 'plugins/dashboard/store/data';
import { useRecoilValue } from 'recoil';
import PrefixInput from '../shared/PrefixInput';
import styled from 'styled-components';

const Endpoints = () => {
  const { fetchEndpoint, postEndpoint } = useRecoilValue(endpointsAtom);

  return (
    <Wrapper>
      <Field>
        <PrefixInput text="GET" defaultValue={`${fetchEndpoint}`} />
      </Field>
      <Field>
        <PrefixInput text="POST" defaultValue={`${postEndpoint}`} />
      </Field>
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
