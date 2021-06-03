import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';

const SidebarItem = ({ text, isActive, onItemSelected }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={() => onItemSelected(text)} selected={isActive}>
      <ListItemText
        className={isActive ? classes.itemActiveText : classes.itemText}
        primary={text.charAt(0).toUpperCase() + text.slice(1)}
      />
    </ListItem>
  );
};

export default SidebarItem;
