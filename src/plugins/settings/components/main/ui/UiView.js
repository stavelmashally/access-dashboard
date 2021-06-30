import React from 'react';
import SectionsList from './SectionsList';
import { Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom, refreshAtom } from 'plugins/settings/store';
import { useSetRecoilState } from 'recoil';
import * as access from 'plugins/access';
import { addConfigProperty } from 'plugins/access/gate';
import styled from 'styled-components';

const UiView = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const refresh = useSetRecoilState(refreshAtom);

  const config = access[selected]();

  const handleAddSection = () => {
    addConfigProperty({ path: selected, value: { sectionTitle: {} } });
    refresh({});
  };

  return (
    <Wrapper>
      <SectionsList config={config} type={selected} />
      <Button
        style={{ textTransform: 'none' }}
        size='large'
        startIcon={<Add />}
        onClick={handleAddSection}
      >
        <Typography variant='h5'> New</Typography>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;

export default UiView;
