import React, { useState } from 'react';
import AppModal from 'plugins/settings/components/shared/AppModal';
import { IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';

const EditButtons = ({ onDelete, onAdd }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <IconButton onClick={onAdd}>
        <Add />
      </IconButton>
      <IconButton onClick={() => setModalOpen(true)}>
        <Remove />
      </IconButton>
      {modalOpen && (
        <AppModal
          msg='Are you sure you want to delete this section?'
          onSubmit={handleDelete}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default EditButtons;
