import React from 'react';
import { Drawer, List, Divider } from '@material-ui/core';
import Endpoints from './Endpoints';
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
import { SIDEBAR_WIDTH, TOOLBAR_HEIGHT } from '../shared/Layouts';
import { useRecoilState } from 'recoil';
import { selectedAtom } from 'plugins/dashboard/store/ui';

import { motion, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    position: 'fixed',
    top: TOOLBAR_HEIGHT,
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    marginTop: TOOLBAR_HEIGHT,
    display: 'flex',
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
  const [selected, setSelected] = useRecoilState(selectedAtom);

  const handleSelected = text => {
    setSelected(text);
  };

  const renderListItems = () => {
    return sidebarItems.map(item => {
      return (
        <SidebarItem
          key={item.text}
          text={item.text}
          icon={item.icon}
          onSelected={handleSelected}
          selected={item.text === selected}
        />
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
      <SidebarContainer>
        <AnimateSharedLayout transition={{ duration: 0.5 }}>
          <List>{renderListItems()}</List>
        </AnimateSharedLayout>
        <div>
          <Divider />
          <Endpoints />
        </div>
      </SidebarContainer>
    </Drawer>
  );
};

const SidebarItem = ({ text, icon, onSelected, selected }) => {
  const classes = useStyles();

  return (
    <div style={{ position: 'relative' }}>
      {selected && <Rect layoutId="rect" />}
      <ListItem
        className={classes.listItem}
        button
        disableRipple
        onClick={() => onSelected(text)}
      >
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
        <ListItemText
          className={selected ? classes.itemActiveText : classes.itemText}
          primary={text.charAt(0).toUpperCase() + text.slice(1)}
        />
      </ListItem>
    </div>
  );
};

const SidebarContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Rect = styled(motion.div)`
  width: 100%;
  height: 50px;
  position: absolute;
  background-color: #e9eaf5;
  z-index: 0;
`;

export default Sidebar;
