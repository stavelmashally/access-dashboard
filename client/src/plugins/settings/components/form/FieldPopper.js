import React from 'react';
import { Popper } from '@material-ui/core';
import styled from 'styled-components/macro';

const options = [
  { type: 'String', value: { propertyName: 'field value' } },
  { type: 'Number', value: { propertyName: 0 } },
  { type: 'Boolean', value: { propertyName: true } },
  { type: 'Color', value: { propertyName: '#ffffff' } },
  { type: 'Array', value: { propertyName: ['item1'] } },
];

const FieldPopper = ({ anchorEl, onSelected }) => {
  return (
    <Popper id="simple-popper" open anchorEl={anchorEl}>
      <PopperContainer>
        {options.map(({ type, value }) => (
          <PopperItem key={type} onClick={() => onSelected(value)}>
            {type}
          </PopperItem>
        ))}
      </PopperContainer>
    </Popper>
  );
};

const PopperContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 3px 11px 0px #b2b2b21a, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #b2b2b21a;
`;

const PopperItem = styled.div`
  width: 100px;
  padding: 0.5rem;
  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

export default FieldPopper;
