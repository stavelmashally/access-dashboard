import React, { useState } from 'react';
import { useToggler } from 'plugins/dashboard/hooks/useToggler';
import { formatDate } from 'plugins/dashboard/services/date';
import Input from 'plugins/dashboard/components/shared/Input';
import styled from 'styled-components/macro';

const FormatField = ({ value }) => {
  const [editMode, toggleEditMode] = useToggler(false);
  const [inputFormat, setInputFormat] = useState(value);

  const handleFormatChanged = event => {
    setInputFormat(event.target.value);
  };

  return (
    <div>
      {editMode ? (
        <Input value={inputFormat} onChange={handleFormatChanged} />
      ) : (
        <Code onDoubleClick={e => toggleEditMode()}>{formatDate(value)} </Code>
      )}
    </div>
  );
};

export const Code = styled.code`
  font-size: 1rem;
  border-radius: 2px;
  background: #f3f6fa;
  padding: 0.5rem;
`;

export default FormatField;
