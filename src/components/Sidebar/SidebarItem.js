import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  itemText: {
    color: '#8D8D8D',
  },
  itemActiveText: {
    color: theme.palette.primary.main,
  },
}));

const SidebarItem = ({ text, onSelected, value, isActive }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      onClick={() => onSelected({ text, value })}
      selected={isActive}
    >
      <ListItemText
        className={isActive ? classes.itemActiveText : classes.itemText}
        primary={text.charAt(0).toUpperCase() + text.slice(1)}
      />
    </ListItem>
  );
};

export default SidebarItem;
