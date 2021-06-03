import React, { useState } from 'react';
import {
  Drawer,
  List,
  Typography,
  Divider,
  Toolbar,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { VisibilityOutlined, CodeOutlined } from '@material-ui/icons';
import SidebarItem from './SidebarItem';
import useStyles from './styles';
import { getFromConfig } from '../../plugins/access/gate';

const config = getFromConfig();

const SideBar = () => {
  const [uiMode, setUiMode] = useState(true);
  const [activeItem, setActiveItem] = useState(Object.keys(config)[0]);
  const classes = useStyles();

  const handleItemSelected = item => {
    setActiveItem(item);
  };

  const renderModeIcons = () => {
    return (
      <Tooltip title={uiMode ? 'switch to code' : 'switch to ui'}>
        <IconButton onClick={() => setUiMode(prevMode => !prevMode)}>
          {uiMode ? <VisibilityOutlined /> : <CodeOutlined />}
        </IconButton>
      </Tooltip>
    );
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
      anchor='left'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6'>Elements</Typography>
        {renderModeIcons()}
      </Toolbar>
      <Divider />
      <List>{renderItems()}</List>
    </Drawer>
  );
};

export default SideBar;
