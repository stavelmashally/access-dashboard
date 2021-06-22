import React, { useState } from 'react';
import EditableSection from './EditableSection';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom } from '../../../store';
import * as access from 'plugins/access';
import { editConfigKey, replaceConfig } from 'plugins/access/gate';
import styled from 'styled-components';

const Ui = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const [, forceRender] = useState({});

  const config = access[selected]();

  const handleTitleChanged = keys => {
    editConfigKey(keys);
    forceRender({});
  };

  const renderSections = () => {
    return Object.entries(config).map(([key, value]) => {
      return (
        <CardWrapper>
          <EditableSection
            key={key}
            title={key}
            values={value}
            type={selected}
            onTitleChange={handleTitleChanged}
          />
        </CardWrapper>
      );
    });
  };

  return (
    <Container>
      {renderSections()}
      <button
        onClick={() =>
          replaceConfig({ path: selected, value: { ...config, newK: 'new' } })
        }
      >
        Add Section+
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
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

const NewSectionWrapper = styled.div`
  display: flex;
  gap: 1rem;
`

export default Ui;
