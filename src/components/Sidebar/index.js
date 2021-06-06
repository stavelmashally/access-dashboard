import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import SidebarItem from './SidebarItem';
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState } from 'recoil';
import configAtom from 'recoil/configState';
import { getFromConfig } from 'plugins/access/gate';

const sidebarWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
}));

const structure = getFromConfig();

const SideBar = () => {
  const classes = useStyles();
  const [active, setActive] = useState(Object.keys(structure)[0]);
  const setConfig = useSetRecoilState(configAtom);

  useEffect(() => {
    setConfig(Object.values(structure)[0]);
  }, [setConfig]);

  const handleSelected = ({ text, value }) => {
    setActive(text);
    setConfig(value);
  };

  const renderListItems = () => {
    return Object.entries(structure).map(([key, value]) => (
      <SidebarItem
        key={key}
        text={key}
        value={value}
        onSelected={handleSelected}
        isActive={key === active}
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
      <List>{renderListItems()}</List>
    </Drawer>
  );
};

export default SideBar;
