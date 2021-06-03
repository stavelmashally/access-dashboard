import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - 240px)`,
    display: 'flex',
  },
}));

const HeaderItemsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const classes = useStyles();

  const renderButtons = () => {
    return (
      <Tooltip title='Save'>
        <IconButton color='inherit' aria-label='save' component='span'>
          <Save />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <AppBar position='fixed' elevation={0} className={classes.appBar}>
      <Toolbar>
        <HeaderItemsContainer>
          <Typography variant='h6'>Colors</Typography>
          {renderButtons()}
        </HeaderItemsContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
