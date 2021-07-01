import React from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import SidebarItem from './SidebarItem';
import { uniqueId } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { SIDEBAR_WIDTH } from '../shared/Layout';
import { useRecoilState } from 'recoil';
import { selectedConfigAtom } from 'plugins/settings/store';

const useStyles = makeStyles({
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
});

const sidebarItems = [
  'color',
  'icon',
  'dimensions',
  'format',
  'general',
  'type',
];

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = useRecoilState(selectedConfigAtom);

  const handleSelected = text => {
    setSelected(text);
  };

  const renderListItems = () => {
    return sidebarItems.map(item => (
      <SidebarItem
        key={uniqueId()}
        text={item}
        onSelected={handleSelected}
        isActive={item === selected}
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

export default Sidebar;
