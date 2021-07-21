import React, { useState } from 'react';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useInputField } from '../../hooks/useInputField';
import { useStateWithCallback } from 'plugins/settings/hooks/useStateWithCallback';
import Input from 'plugins/settings/components/shared/Input';
import styled from 'styled-components/macro';

const EditableList = ({ fieldValue, onValueChanged, editMode }) => {
  const [list, setList] = useStateWithCallback(fieldValue);
  const [newInput, setNewInput] = useState('');

  const handleValueChanged = newList => {
    onValueChanged(newList);
  };

  const handleListItemChanged = (index, value) => {
    setList(
      prevList => [
        ...prevList.slice(0, index),
        value,
        ...prevList.slice(index + 1),
      ],
      handleValueChanged
    );
  };

  const handleDeleteClicked = index => event => {
    event.preventDefault();
    setList(
      prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)],
      handleValueChanged
    );
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && newInput.trim(' ').length > 0) {
      setList(prevList => [...prevList, newInput], handleValueChanged);
      setNewInput('');
    }
  };

  const renderList = () => {
    return list.map((elem, index) => {
      return (
        <EditableListItem
          key={index}
          value={elem}
          index={index}
          onSubmit={handleListItemChanged}
          onDelete={handleDeleteClicked}
        />
      );
    });
  };

  return (
    <List>
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
    </List>
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

const ListItem = styled.li`
  padding-left: 0;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding-left: 1rem;
`;

export default EditableList;
