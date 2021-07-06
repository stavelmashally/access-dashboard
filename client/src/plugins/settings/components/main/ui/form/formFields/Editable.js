import React, { useState } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AppModal from 'plugins/settings/components/shared/AppModal';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import { Row, Input } from 'plugins/settings/components/shared/Layout';

const Editable = ({ label, onLabelChanged, onDelete, children }) => {
  const [input, setInput] = useState(label);
  const [modalOpen, toggleModal] = useToggler(false);
  const [editMode, setEditMode] = useState(label === 'propertyName');

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onLabelChanged({ label, value: input });
      setEditMode(false);
    }
    if (key === 'Escape') {
      setInput(label);
      setEditMode(false);
    }
  };

  const handleInputChanged = evt => {
    setInput(evt.target.value);
  };

  const handleDelete = () => {
    onDelete({ propName: label });
  };

  return (
    <Row>
      {editMode ? (
        <Input
          autoFocus
          value={input}
          onChange={handleInputChanged}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Typography variant="h6" onDoubleClick={setEditMode}>
          {label}
        </Typography>
      )}
      {children}
      {editMode && (
        <IconButton onClick={toggleModal}>
          <Delete />
        </IconButton>
      )}
      {modalOpen && (
        <AppModal
          msg="Are you sure you want to delete this field?"
          onSubmit={handleDelete}
          onClose={toggleModal}
        />
      )}
    </Row>
  );
};

export default Editable;
