import React, { useState, useEffect } from 'react';
import { useToggler } from 'plugins/dashboard/hooks/useToggler';
import FieldPopper from './FieldPopper';
import { useSetRecoilState } from 'recoil';
import { confirmModalAtom } from 'plugins/dashboard/store';
import { SpaceBetween } from 'plugins/dashboard/components/shared/Layouts';
import { ExpandMore, ExpandLess, Add, Delete } from '@material-ui/icons';
import { IconButton, Typography, Tooltip } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components/macro';

const sectionVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
  },
  open: {
    opacity: 1,
    height: 'auto',
  },
};

const FormHeader = ({ title, onSubmit, onDelete, onAdd, children }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [isExpanded, toggleExpanded] = useToggler(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const confirmModal = useSetRecoilState(confirmModalAtom);

  useEffect(() => {
    setInputTitle(title);
    setEditMode(title === 'sectionTitle');
  }, [title]);

  const handleKeyDown = event => {
    const { key, target } = event;
    const newTitle = target.value.trim(' ');
    if (key === 'Enter' && newTitle.length > 0) {
      onSubmit(newTitle);
      setEditMode(false);
    }
    if (key === 'Escape' && title !== 'sectionTitle') {
      setEditMode(false);
    }
  };

  const handleInputChanged = event => {
    setInputTitle(event.target.value);
  };

  const handleDblClickOnTitle = () => {
    !isExpanded && toggleExpanded();
    setEditMode(true);
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
      <AnimatePresence initial={false}>
        {isExpanded && (
          <InnerSection
            variants={sectionVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.8, ease: [0.04, 0.82, 0.23, 0.98] }}
          >
            {children}
          </InnerSection>
        )}
      </AnimatePresence>
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

export const InnerSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  gap: 1rem;
  overflow: hidden;
`;

export default FormHeader;
