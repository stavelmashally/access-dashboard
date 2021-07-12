import React, { useState } from 'react';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import FieldPopper from './FieldPopper';
import { SpaceBetween } from 'plugins/settings/components/shared/Layout';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import AppModal from 'plugins/settings/components/shared/AppModal';
import { IconButton, Typography, Tooltip } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import styled from 'styled-components';

const FormHeader = ({ title, onSubmit, onDelete, onAdd, children }) => {
  const [input, setInput] = useState(title);
  const [modalOpen, toggleModal] = useToggler(false);
  const [isExpanded, toggleExpanded] = useToggler(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, toggleEditMode] = useToggler(title === 'sectionTitle');

  const handleKeyDown = evt => {
    if (evt.key === 'Enter') {
      if (input !== '' && input !== title) onSubmit({ value: input });
      toggleEditMode();
    }
    if (evt.key === 'Escape') {
      setInput(title);
      toggleEditMode();
    }
  };

  const handleInputChanged = evt => {
    setInput(evt.target.value);
  };

  const handleAddField = type => {
    onAdd(type);
    setAnchorEl(null);
  };

  const renderButtons = () => {
    return (
      <ButtonsWrapper>
        <Tooltip title="add property">
          <IconButton
            onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete section">
          <IconButton onClick={toggleModal}>
            <Delete />
          </IconButton>
        </Tooltip>
      </ButtonsWrapper>
    );
  };

  const renderTitle = () => {
    return (
      <SpaceBetween>
        <Tooltip title="Double-click to edit">
          <Typography
            variant="h5"
            color="textSecondary"
            onDoubleClick={toggleEditMode}
          >
            {input}
          </Typography>
        </Tooltip>
        <IconButton onClick={toggleExpanded}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </SpaceBetween>
    );
  };

  const renderEditableTitle = () => {
    return (
      <SpaceBetween>
        <Input
          type="text"
          autoFocus
          value={input}
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
        />
        {renderButtons()}
      </SpaceBetween>
    );
  };

  const handleDelete = () => {
    onDelete({});
    toggleModal();
  };

  return (
    <Wrapper>
      {editMode ? renderEditableTitle() : renderTitle()}
      {isExpanded && <InnerSection>{children}</InnerSection>}
      {anchorEl && (
        <FieldPopper anchorEl={anchorEl} onSelected={handleAddField} />
      )}
      {modalOpen && (
        <AppModal
          msg="Are you sure you want to delete this section?"
          onSubmit={handleDelete}
          onClose={toggleModal}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 1.5rem;
  width: 60%;
  border: none;
  outline: none;
`;

export const InnerSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  gap: 1rem;
`;

export default FormHeader;
