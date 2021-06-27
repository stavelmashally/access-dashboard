import React from 'react';
import SectionsList from './SectionsList';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom, refreshAtom } from 'plugins/settings/store';
import { useSetRecoilState } from 'recoil';
import * as access from 'plugins/access';
import { replaceConfig } from 'plugins/access/gate';
import styled from 'styled-components';

const UiView = () => {
  const selected = useRecoilValue(selectedConfigAtom);
  const refresh = useSetRecoilState(refreshAtom);

  const config = access[selected]();

  const handleAddSection = () => {
    replaceConfig({ path: selected, value: { ...config, sectionTitle: {} } });
    refresh({});
  };

  return (
    <Wrapper>
      <SectionsList config={config} selected={selected} />
      <AddButton onClick={handleAddSection}>Add section +</AddButton>
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

const AddButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  :hover {
    color: #395464;
  }
`;

export default UiView;
