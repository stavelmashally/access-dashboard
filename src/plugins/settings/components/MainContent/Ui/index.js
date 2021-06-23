import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { useRecoilValue } from 'recoil';
import { Typography } from '@material-ui/core';
import { selectedConfigAtom } from '../../../store';
import * as access from 'plugins/access';
import { editConfigKey, replaceConfig, deleteValue } from 'plugins/access/gate';
import styled from 'styled-components';

const Ui = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const [, forceRender] = useState({});

  const config = access[selected]();

  const handleTitleChanged = keys => {
    editConfigKey(keys);
    forceRender({});
  };

  const handleAddSection = () => {
    replaceConfig({ path: selected, value: { ...config, sectionTitle: {} } });
    forceRender({});
  };

  const handleDeleteSection = path => {
    deleteValue(path);
    forceRender({});
  };

  const renderSections = () => {
    return Object.entries(config).map(([key, value]) => {
      return (
        <CardWrapper key={key}>
          <EditableSection
            onDeleteSection={handleDeleteSection}
            key={key}
            title={key}
            values={value}
            type={selected}
            path={`${selected}.${key}`}
            onTitleChange={handleTitleChanged}
          />
        </CardWrapper>
      );
    });
  };

  return (
    <Container>
      {renderSections()}
      <AddSectionWrapper onClick={handleAddSection}>
        <Typography variant='h5'>Add section +</Typography>
      </AddSectionWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  width: 90%;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;

const AddSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #012333;
  padding: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  :hover {
    color: #395464;
  }
`;

export default Ui;
