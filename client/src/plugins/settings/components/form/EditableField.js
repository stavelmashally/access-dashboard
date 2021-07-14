import React, { useState } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AppModal from 'plugins/settings/components/shared/AppModal';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import { Row, Input } from 'plugins/settings/components/shared/Layouts';

const EditableField = ({ label, onLabelChanged, onDelete, children }) => {
  const [inputLabel, setInputLabel] = useState(label);
  const [modalOpen, toggleModal] = useToggler(false);
  const [editMode, setEditMode] = useState(label === 'propertyName');

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      onLabelChanged({ label, value: inputLabel });
      setEditMode(false);
    }
    if (key === 'Escape') {
      setInputLabel(label);
      setEditMode(false);
    }
  };

  const handleInputChanged = evt => {
    setInputLabel(evt.target.value);
  };

  const handleDelete = () => {
    onDelete(label);
  };

  return (
    <Row>
      {editMode ? (
        <Input
          variant="small"
          autoFocus
          value={inputLabel}
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
        <IconButton size="small" onClick={toggleModal}>
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

export default EditableField;