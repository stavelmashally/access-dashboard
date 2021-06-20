import React from 'react';
import Card from '../Card';
import { useRecoilValue } from 'recoil';
import { selectedConfigAtom } from '../../../store';
import * as access from 'plugins/access';
import { renderContent } from './elements';
import styled from 'styled-components';

const Ui = () => {
  const selected = useRecoilValue(selectedConfigAtom);

  const config = access[selected]();

  const renderCards = () =>
    Object.entries(config).map(([key, values]) => (
      <Card
        key={key}
        title={key}
        content={renderContent({ type: selected, data: values })}
      />
    ));

  return <Container>{renderCards()}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding: 1rem 0;
`;

export default Ui;
