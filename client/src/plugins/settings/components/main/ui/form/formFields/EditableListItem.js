import React, { useState } from 'react';
import { Input } from 'plugins/settings/components/shared/Layout';
import { HighlightOffOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

const EditableListItem = ({ value, index, onSubmit, onDelete }) => {
  const [input, setInput] = useState(value);

  const handleKeyDown = event => {
    if (event.key === 'Enter' && input.trim(' ').length > 0) {
      onSubmit(index, input);
    }
  };

  return (
    <ListItem key={index}>
      <Input
        variant="small"
        type="text"
        value={input}
        placeholder="Enter a value"
        onChange={e => setInput(e.target.value)}
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

export default EditableListItem;
