import React, { useState, useEffect } from 'react';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import FieldPopper from './FieldPopper';
import { useSetRecoilState } from 'recoil';
import { confirmModalAtom } from 'plugins/settings/store';
import { SpaceBetween } from 'plugins/settings/components/shared/Layouts';
import { ExpandMore, ExpandLess, Add, Delete } from '@material-ui/icons';
import { IconButton, Typography, Tooltip } from '@material-ui/core';
import styled from 'styled-components/macro';

const FormHeader = ({ title, onSubmit, onDelete, onAdd, children }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [isExpanded, toggleExpanded] = useToggler(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, toggleEditMode] = useToggler(title === 'sectionTitle');
  const confirmModal = useSetRecoilState(confirmModalAtom);

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  const handleKeyDown = event => {
    const { key, target } = event;
    const newTitle = target.value.trim(' ');
    if (key === 'Enter' && newTitle.length > 0) {
      onSubmit(newTitle);
      toggleEditMode();
    }
    if (key === 'Escape' && title !== 'sectionTitle') {
      toggleEditMode();
    }
  };

  const handleInputChanged = event => {
    setInputTitle(event.target.value);
  };

  const handleDblClickOnTitle = () => {
    !isExpanded && toggleExpanded();
    toggleEditMode();
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
            aria-label="add"
            onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete section">
          <IconButton
            aria-label="delete"
            onClick={() =>
              confirmModal({
                message: 'Are you sure you want to delete this section?',
                onConfirm: onDelete,
              })
            }
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </ButtonsWrapper>
    );
  };

  const renderTitle = () => {
    return (
      <SpaceBetween onDoubleClick={handleDblClickOnTitle}>
        <Tooltip title="Double-click to edit">
          <Typography variant="h5" color="textSecondary">
            {title}
          </Typography>
        </Tooltip>
        <IconButton onClick={toggleExpanded}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </SpaceBetween>
    );
  };

  const renderEditMode = () => {
    return (
      <SpaceBetween>
        <Input
          type="text"
          aria-label="title value"
          placeholder={title}
          autoFocus
          value={inputTitle}
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
        />
        {renderButtons()}
      </SpaceBetween>
    );
  };

  return (
    <Wrapper>
      {editMode ? renderEditMode() : renderTitle()}
      {isExpanded && <InnerSection>{children}</InnerSection>}
      {anchorEl && (
        <FieldPopper anchorEl={anchorEl} onSelected={handleAddField} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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
