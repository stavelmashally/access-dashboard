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
import { selectedConfigAtom } from 'plugins/dashboard/store';
import { motion, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';

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
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  itemActiveText: {
    color: theme.palette.text.primary,
  },
  listItemIcon: {
    minWidth: '35px',
    color: theme.palette.text.secondary,
  },
  listItem: {
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
    return sidebarItems.map(item => {
      return (
        <div style={{ position: 'relative' }} key={uniqueId()}>
          {item.text === selected && <Rect layoutId="rect" />}
          <SidebarItem
            text={item.text}
            icon={item.icon}
            onSelected={handleSelected}
            isActive={item.text === selected}
          />
        </div>
      );
    });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <AnimateSharedLayout transition={{ duration: 0.5 }}>
        <List>{renderListItems()}</List>
      </AnimateSharedLayout>
    </Drawer>
  );
};

const SidebarItem = ({ text, icon, onSelected, isActive }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.listItem}
      button
      disableRipple
      onClick={() => onSelected(text)}
    >
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText
        className={isActive ? classes.itemActiveText : classes.itemText}
        primary={text.charAt(0).toUpperCase() + text.slice(1)}
      />
    </ListItem>
  );
};

const Rect = styled(motion.div)`
  width: 100%;
  height: 50px;
  position: absolute;
  background-color: #e9eaf5;
  z-index: 0;
`;

export default Sidebar;