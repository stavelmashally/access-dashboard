import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import ViewModeToggle from './ViewModeToggle';
import SaveButton from './SaveButton';
import appLogo from 'assets/app-logo.png';
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

const TitleContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  width: '240px';
`;

const ButtonsContainer = styled.div``;

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <TitleContainer>
          <img src={appLogo} alt='app logo' width={40} height={40} />
          <Typography variant='h5'>Access</Typography>
        </TitleContainer>
        <ButtonsContainer>
          <SaveButton />
          <ViewModeToggle />
        </ButtonsContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
