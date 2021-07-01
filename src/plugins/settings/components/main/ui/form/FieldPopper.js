import React from 'react';
import Popper from '@material-ui/core/Popper';
import styled from 'styled-components';

const options = [
  { type: 'String', value: { propertyName: 'field value' } },
  { type: 'Boolean', value: { propertyName: true } },
  { type: 'Number', value: { propertyName: 0 } },
  { type: 'Array', value: { propertyName: ['item1', 'item2'] } },
];

const FieldPopper = ({ anchorEl, onSelected }) => {
  const handleSelected = value => {
    onSelected(value);
  };

  const renderOptions = () => {
    return options.map(({ type, value }) => (
      <PopperItem key={type} onClick={() => handleSelected(value)}>
        {type}
      </PopperItem>
    ));
  };

  return (
    <Popper id='simple-popper' open anchorEl={anchorEl}>
      <PopperContainer>{renderOptions()}</PopperContainer>
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
