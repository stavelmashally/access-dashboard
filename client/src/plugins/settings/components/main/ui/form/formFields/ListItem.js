import React from 'react';
import { Delete } from '@material-ui/icons';
import { useHover } from 'plugins/settings/hooks/useHover';
import styled from 'styled-components';

const ListItem = ({ text, onDelete }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <Wraper ref={hoverRef} onClick={() => onDelete(text)}>
      {isHovered ? `${text} x` : text}
    </Wraper>
  );
};

const Wraper = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;

export default ListItem;
