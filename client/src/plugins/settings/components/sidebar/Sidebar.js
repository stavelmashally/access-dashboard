import React from 'react';
import { Drawer, List, Toolbar } from '@material-ui/core';
import {
  ColorLensOutlined,
  SentimentSatisfiedOutlined,
  AspectRatioOutlined,
  LanguageOutlined,
  TextFormatOutlined,
  CategoryOutlined,
} from '@material-ui/icons';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SIDEBAR_WIDTH } from '../shared/Layouts';
import { useRecoilState } from 'recoil';
import { uniqueId } from 'lodash';
import { selectedConfigAtom } from 'plugins/settings/store';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
  },
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

const sidebarItems = [
  { text: 'color', icon: <ColorLensOutlined /> },
  { text: 'icon', icon: <SentimentSatisfiedOutlined /> },
  { text: 'dimensions', icon: <AspectRatioOutlined /> },
  { text: 'format', icon: <TextFormatOutlined /> },
  { text: 'general', icon: <LanguageOutlined /> },
  { text: 'type', icon: <CategoryOutlined /> },
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
        text={item.text}
        icon={item.icon}
        onSelected={handleSelected}
        isActive={item.text === selected}
      />
    ));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <List>{renderListItems()}</List>
    </Drawer>
  );
};

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

export default Sidebar;
