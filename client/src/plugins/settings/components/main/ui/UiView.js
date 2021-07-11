import React from 'react';
import SectionsList from './SectionsList';
import { Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import styled from 'styled-components';
import * as access from 'plugins/access';
import { addConfigProperty } from 'plugins/access/gate';

const UiView = ({ selected }) => {
  const [, setRefresh] = useRecoilState(refreshAtom);

  const config = access[selected]();

  const AddSection = () => {
    const sectionValue = selected === 'format' ? '' : {};
    addConfigProperty({
      path: selected,
      value: { sectionTitle: sectionValue },
    });
    setRefresh({});
  };

  return (
    <Wrapper>
      <SectionsList config={config} selected={selected} />
      <Button
        style={{ textTransform: 'none' }}
        size="large"
        startIcon={<Add />}
        onClick={AddSection}
      >
        <Typography variant="h5">New</Typography>
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
