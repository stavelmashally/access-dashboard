import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  itemText: {
    color: theme.palette.text.secondary,
  },
  itemActiveText: {
    color: theme.palette.primary.main,
  },
  listItemIcon: {
    minWidth: '35px',
    color: theme.palette.text.secondary,
  },
}));

const SidebarItem = ({ text, icon, onSelected, isActive }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={() => onSelected(text)} selected={isActive}>
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText
        className={isActive ? classes.itemActiveText : classes.itemText}
        primary={text.charAt(0).toUpperCase() + text.slice(1)}
      />
    </ListItem>
  );
};

export default SidebarItem;
