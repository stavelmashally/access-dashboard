import React, { useRef, useState } from 'react';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import FieldPopper from './FieldPopper';
import AppModal from 'plugins/settings/components/shared/AppModal';
import { IconButton, Typography, Tooltip } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import styled from 'styled-components';

const FormHeader = ({ title, onSubmit, onDelete, onAdd }) => {
  const [modalOpen, toggleModal] = useToggler(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, toggleEditMode] = useToggler(title === 'sectionTitle');
  const titleRef = useRef();

  const handleKeyDown = evt => {
    if (evt.key === 'Enter') {
      const newTitle = titleRef.current.value;
      if (newTitle !== '') onSubmit(newTitle);
      toggleEditMode();
    }
    if (evt.key === 'Escape') toggleEditMode();
  };

  const handleAddField = type => {
    onAdd(type);
    setAnchorEl(null);
  };

  const renderButtons = () => {
    return (
      <ButtonsWrapper>
        <IconButton
          onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}
        >
          <Add />
        </IconButton>
        <IconButton onClick={toggleModal}>
          <Delete />
        </IconButton>
      </ButtonsWrapper>
    );
  };

  const renderTitle = () => {
    return (
      <Tooltip title='Double-click to edit'>
        <Typography
          variant='h5'
          color='textSecondary'
          onDoubleClick={toggleEditMode}
        >
          {title}
        </Typography>
      </Tooltip>
    );
  };

  const renderEditableTitle = () => {
    return (
      <>
        <Input
          ref={titleRef}
          type='text'
          autoFocus
          defaultValue={title}
          onKeyDown={handleKeyDown}
        />
        {renderButtons()}
      </>
    );
  };

  const handleDelete = () => {
    onDelete(title);
    toggleModal();
  };

  return (
    <Wrapper>
      {editMode ? renderEditableTitle() : renderTitle()}
      {anchorEl && (
        <FieldPopper anchorEl={anchorEl} onSelected={handleAddField} />
      )}
      {modalOpen && (
        <AppModal
          msg='Are you sure you want to delete this section?'
          onSubmit={handleDelete}
          onClose={toggleModal}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  font-size: 1.5rem;
  width: 40%;
  border: none;
  border-bottom: 2px solid;
  outline: none;
`;

export default FormHeader;
