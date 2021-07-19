import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { confirmModalAtom } from 'plugins/settings/store';
import { useInputField } from 'plugins/settings/hooks/useInputField';
import { Row } from 'plugins/settings/components/shared/Layouts';
import Input from 'plugins/settings/components/shared/Input';
import Label from 'plugins/settings/components/shared/Label';

const EditableField = ({ label, onLabelChanged, onDelete, children }) => {
  const inputLabel = useInputField(label);
  const [editMode, setEditMode] = useState(label === 'propertyName');
  const confirmModal = useSetRecoilState(confirmModalAtom);

  const handleKeyDown = event => {
    const { key, target } = event;
    const newLabel = target.value.trim(' ');
    if (key === 'Enter' && newLabel.length > 0) {
      onLabelChanged({ label, value: newLabel });
      setEditMode(false);
    }
    if (key === 'Escape') {
      onLabelChanged({ label, value: label });
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    onDelete(label);
  };

  return (
    <Row>
      {editMode ? (
        <Input
          type="text"
          aria-label="label value"
          variant="small"
          autoFocus
          {...inputLabel}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Label onDoubleClick={setEditMode}>
          {label}
        </Label>
      )}
      {children}
      {editMode && (
        <IconButton
          size="small"
          onClick={() =>
            confirmModal({
              message: 'Are you sure you want to delete this field?',
              onConfirm: handleDelete,
            })
          }
        >
          <Delete />
        </IconButton>
      )}
    </Row>
  );
};

export default EditableField;
