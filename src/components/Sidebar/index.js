import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import useStyles from './styles';

const SideBar = () => {
  const classes = useStyles();

  const drawerItems = ['Icon', 'Color', 'Format', 'General', 'Chart'].map(
    item => (
      <List key={item}>
        <ListItem button>
          <ListItemText primary={item} />
        </ListItem>
      </List>
    )
  );
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}></div>
      {drawerItems}
    </Drawer>
  );
};

export default SideBar;
