import React, { useState } from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import SidebarItem from './SidebarItem';
import { getFromConfig } from '../../plugins/access/gate';
import { sidebarWidth } from '../Layout';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { appState } from '../App';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
}));

const config = getFromConfig();

const SideBar = () => {
  const [state, setState] = useRecoilState(appState);

  const [activeItem, setActiveItem] = useState(Object.keys(config)[0]);
  const classes = useStyles();

  const handleItemSelected = item => {
    setActiveItem(item);
    setState({ element: item });
  };

  const renderItems = () => {
    return Object.keys(config).map(itemText => (
      <SidebarItem
        key={itemText}
        text={itemText}
        onItemSelected={handleItemSelected}
        isActive={itemText === activeItem}
      />
    ));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      color='primary'
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>{renderItems()}</List>
    </Drawer>
  );
};

export default SideBar;
