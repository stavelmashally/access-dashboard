import React, { useState } from 'react';
import EditableField from './EditableField';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useInputField } from './useInputField';
import { useStateWithCallback } from 'plugins/settings/hooks/useStateWithCallback';
import { Input } from 'plugins/settings/components/shared/Layouts';
import styled from 'styled-components';

const EditableList = ({ label, value, onValueChanged, ...props }) => {
  const [list, setList] = useStateWithCallback(value);
  const [newInput, setNewInput] = useState('');

  const handleValueChanged = newList => {
    onValueChanged({ label, value: newList });
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
    <EditableField label={label} {...props}>
      <List>
        {renderList()}
        <Input
          variant="small"
          name="newInput"
          onChange={e => setNewInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New Item"
          value={newInput}
        />
      </List>
    </EditableField>
  );
};

const EditableListItem = ({ value, index, onSubmit, onDelete }) => {
  const inputValue = useInputField(value);

  const handleKeyDown = event => {
    const { key, target } = event;
    if (key === 'Enter' && target.value.trim(' ').length > 0) {
      onSubmit(index, inputValue);
    }
    if (key === 'Escape') onSubmit(index, value);
  };

  return (
    <ListItem key={index}>
      <Input
        variant="small"
        type="text"
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
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
`;

export default EditableList;
