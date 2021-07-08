import React from 'react';
import { uniqueId } from 'lodash';
import { Column } from '../../shared/Layout';
import EditableForm from './form/EditableForm';
import styled from 'styled-components';

const SectionsList = ({ config, selected }) => {
  return (
    <Column>
      {Object.entries(config).map(([key, value]) => {
        return (
          <CardWrapper key={uniqueId()}>
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

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a;
`;

export default SectionsList;
