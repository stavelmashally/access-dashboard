import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';

const EditButtons = ({ onDelete, onAdd }) => {
  return (
    <Container>
      <IconButton onClick={onAdd}>
        <Add />
      </IconButton>
      <IconButton onClick={onDelete}>
        <Remove />
      </IconButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default EditButtons;
