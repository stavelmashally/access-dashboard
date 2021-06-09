import React from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import SidebarItem from './SidebarItem';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { selectedConfigAtom } from 'plugins/settings/store';

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

const structure = ['color', 'icon', 'dimensions', 'format', 'general', 'type'];

const SideBar = () => {
  const classes = useStyles();
  const [selected, setSelected] = useRecoilState(selectedConfigAtom);

  const handleSelected = text => setSelected(text);

  const renderListItems = () => {
    return structure.map(key => (
      <SidebarItem
        key={key}
        text={key}
        onSelected={handleSelected}
        isActive={key === selected}
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
