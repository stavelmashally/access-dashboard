import React from 'react';
import { useToggler } from 'plugins/settings/hooks/useToggler';
import { useStateFromProps } from 'plugins/settings/hooks/useStateFromProps';
import { formatDate } from 'plugins/settings/utils/dateUtils';
import { Input } from 'plugins/settings/components/shared/Layouts';
import styled from 'styled-components';

const FormatField = ({ value }) => {
  const [editMode, toggleEditMode] = useToggler(false);
  const [format, setFormat] = useStateFromProps(value);

  const handleFormatChanged = event => {
    setFormat(event.target.value);
  };
  console.log('formatttt')
  return (
    <div>
      {editMode ? (
        <Input value={format} onChange={handleFormatChanged} />
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
