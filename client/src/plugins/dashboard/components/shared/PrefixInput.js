import React from 'react';
import styled from 'styled-components';

const PrefixInput = ({ text, ...inputProps }) => {
  return (
    <InputGroup>
      <InputSpan>{text}</InputSpan>
      <Input {...inputProps} />
    </InputGroup>
  );
};

const InputGroup = styled.div`
  position: relative;
  display: table;
  border-collapse: separate;
`;

const Input = styled.input`
  font-size: 1rem;
  float: left;
  width: 100%;
  display: table-cell;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 0px 4px 4px 0px;
`;

const InputSpan = styled.span`
  font-size: 1rem;
  padding: 4px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
  border-right: 0;
  border-radius: 4px 0px 0px 4px;
`;

export default PrefixInput;
