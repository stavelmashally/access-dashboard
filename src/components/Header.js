import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Save, Visibility, Code } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import appLogo from '../assets/app-logo.png';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const HeaderTitleContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  width: '240px';
  background: '#fff';
`;

const HeaderButtonsContainer = styled.div``;

const Header = () => {
  const [uiMode, setUiMode] = useState(true);
  const classes = useStyles();

  const renderButtons = () => {
    return (
      <>
        <Tooltip title='Save'>
          <IconButton color='inherit' aria-label='save' component='span'>
            <Save />
          </IconButton>
        </Tooltip>
        <Tooltip title={uiMode ? 'switch to code' : 'switch to ui'}>
          <IconButton
            color='inherit'
            onClick={() => setUiMode(prevMode => !prevMode)}
          >
            {uiMode ? <Visibility /> : <Code />}
          </IconButton>
        </Tooltip>
      </>
    );
  };

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <HeaderTitleContainer>
          <img src={appLogo} alt='app logo' width={40} height={40} />
          <Typography variant='h5'>Access</Typography>
        </HeaderTitleContainer>
        <HeaderButtonsContainer>{renderButtons()}</HeaderButtonsContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
