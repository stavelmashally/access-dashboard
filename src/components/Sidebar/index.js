import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
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
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Typography variant='h5' className={classes.title}>
        Elements
      </Typography>
      {drawerItems}
    </Drawer>
  );
};

export default SideBar;
