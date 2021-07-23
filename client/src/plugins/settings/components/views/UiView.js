import React from 'react';
import EditableForm from '../form/EditableForm';
import { Column } from '../shared/Layouts';
import { Add } from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { forceUpdateAtom } from 'plugins/settings/store';
import { addConfigProperty } from 'plugins/access/gate';
import * as access from 'plugins/access';
import styled from 'styled-components/macro';

const UiView = ({ selected }) => {
  const [, forceUpdate] = useRecoilState(forceUpdateAtom);

  const config = access[selected]();

  const AddSection = () => {
    addConfigProperty({
      path: selected,
      value: { sectionTitle: {} },
    });
    forceUpdate(x => x + 1);
  };

  const renderCards = () => {
    return Object.entries(config).map(([key, value], index) => {
      return (
        <CardWrapper key={index}>
          <EditableForm title={key} data={value} path={`${selected}.${key}`} />
        </CardWrapper>
      );
    });
  };

  return (
    <Wrapper>
      <Column>{renderCards()}</Column>
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
  padding: 1rem;
`;

const CardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;

export default UiView;
