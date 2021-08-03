import React, { useState } from 'react';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';
import { useToggler } from 'plugins/dashboard/hooks/useToggler';
import { useInputField } from '../../hooks/useInputField';
import Input from 'plugins/dashboard/components/shared/Input';
import Label from '../shared/Label';
import styled from 'styled-components/macro';

const EditableList = ({ fieldValue, onValueChanged, isEditMode }) => {
  const [newInput, setNewInput] = useState('');
  const [isExpanded, toggleExpanded] = useToggler();

  const handleListItemChanged = (index, value) => {
    onValueChanged([
      ...fieldValue.slice(0, index),
      value,
      ...fieldValue.slice(index + 1),
    ]);
  };

  const handleDeleteClicked = index => event => {
    onValueChanged([
      ...fieldValue.slice(0, index),
      ...fieldValue.slice(index + 1),
    ]);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && newInput.trim(' ').length > 0) {
      onValueChanged([...fieldValue, newInput]);
      setNewInput('');
    }
  };

  const expandBtn =
    fieldValue.length > 2 ? (
      <Button size="small" onClick={() => toggleExpanded()}>
        {isExpanded ? 'show less' : 'show more'}
      </Button>
    ) : null;

  const renderList = () => {
    return fieldValue.map((elem, index) =>
      isEditMode ? (
        <EditableListItem
          key={index}
          value={elem}
          index={index}
          onSubmit={handleListItemChanged}
          onDelete={handleDeleteClicked}
        />
      ) : (
        <ListItem key={index}>
          <Label variant="value" title={fieldValue}>
            {elem}
          </Label>
        </ListItem>
      )
    );
  };

  const renderEditMode = () => {
    return (
      <Wrapper expanded>
        {renderList()}
        <Input
          type="text"
          name="newInput"
          variant="small"
          onChange={e => setNewInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New item"
          value={newInput}
        />
      </Wrapper>
    );
  };

  return isEditMode ? (
    renderEditMode()
  ) : fieldValue.length === 0 ? (
    <Label variant="value">[ ]</Label>
  ) : (
    <Wrapper expanded={isExpanded}>
      {renderList()}
      {expandBtn}
    </Wrapper>
  );
};

const EditableListItem = ({ value, index, onSubmit, onDelete }) => {
  const inputValue = useInputField(value);

  const handleKeyDown = event => {
    const { key, target } = event;
    if (key === 'Enter' && target.value.trim(' ').length > 0) {
      onSubmit(index, target.value);
    }
    if (key === 'Escape') onSubmit(index, value);
  };

  return (
    <ListItem key={index}>
      <Input
        type="text"
        variant="small"
        aria-label="item value"
        placeholder="Enter a value"
        {...inputValue}
        onKeyDown={handleKeyDown}
      />
      <IconButton size="small" onClick={onDelete(index)}>
        <HighlightOffOutlined />
      </IconButton>
    </ListItem>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding-left: 1rem;
  ${({ expanded }) =>
    !expanded &&
    `li:nth-child(n + 3) {
    display: none;
  }`}
`;

const ListItem = styled.li`
  padding-left: 0;
`;

export default EditableList;
