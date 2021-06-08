import React, { useEffect } from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import SidebarItem from './SidebarItem';
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { activeConfigAtom, loadConfigSelector } from 'recoil/config';

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

const structure = [
  'color',
  'icon',
  'dimensions',
  'format',
  'general',
  'type',
];

const SideBar = () => {
  const classes = useStyles();
  const loadConfig = useSetRecoilState(loadConfigSelector);
  const [active, setActive] = useRecoilState(activeConfigAtom);

  useEffect(() => {
    loadConfig();
    setActive(structure[0]);
  }, [loadConfig, setActive]);

  const handleSelected = text => setActive(text);

  const renderListItems = () => {
    return structure.map(key => (
      <SidebarItem
        key={key}
        text={key}
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
