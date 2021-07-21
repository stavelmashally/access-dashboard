import React from 'react';
import EditableForm from '../form/EditableForm';
import { Column } from '../shared/Layouts';
import { Button, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useRecoilState } from 'recoil';
import { refreshAtom } from 'plugins/settings/store';
import styled from 'styled-components/macro';
import * as access from 'plugins/access';
import { addConfigProperty } from 'plugins/access/gate';

const UiView = ({ selected }) => {
  const [, setRefresh] = useRecoilState(refreshAtom);

  const config = access[selected]();

  const AddSection = () => {
    addConfigProperty({
      path: selected,
      value: { sectionTitle: {} },
    });
    setRefresh({});
  };

  const renderSectionList = () => {
    return (
      <Column>
        {Object.entries(config).map(([key, value], index) => {
          return (
            <CardWrapper key={index}>
              <EditableForm
                title={key}
                data={value}
                path={`${selected}.${key}`}
              />
            </CardWrapper>
          );
        })}
      </Column>
    );
  };

  return (
    <Wrapper>
      {renderSectionList()}
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

const CardWrapper = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;
export default UiView;
