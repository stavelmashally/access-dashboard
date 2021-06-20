import React from 'react';
import ViewModeToggle from './ViewModeToggle';
import SaveButton from './SaveButton';
import RestoreButton from './RestoreButton';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
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
          <RestoreButton />
          <ViewModeToggle />
        </ButtonsContainer>
      </Toolbar>
    </AppBar>
  );
};

const TitleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ButtonsContainer = styled.div``;

export default Header;
